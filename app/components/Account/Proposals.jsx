import React from "react";
import {Component} from "react";
import Translate from "react-translate-component";
import ProposedOperation from "components/Blockchain/ProposedOperation";
import BindToChainState from "components/Utility/BindToChainState";
import ChainTypes from "components/Utility/ChainTypes";
import utils from "common/utils";
import ProposalApproveModal from "../Modal/ProposalApproveModal";
import NestedApprovalState from "../Account/NestedApprovalState";
import {ChainStore} from "bitsharesjs/es";
import counterpart from "counterpart";

class Proposals extends Component {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired
    };

    _onApproveModal(id, action) {
        if (this.refs[id + "_" + action]) {
            this.refs[id + "_" + action].show();
        }
    }

    _canApprove(proposal, id) {

        if (proposal.required_active_approvals.indexOf(id) !== -1 && proposal.available_active_approvals.indexOf(id) === -1) {
            return true;
        } else if (proposal.required_owner_approvals.indexOf(id) !== -1 && proposal.available_owner_approvals.indexOf(id) === -1) {
            return true;
        } else {
            return false;
        }
    }

    _canReject(proposal) {
        return (proposal.available_active_approvals.length || proposal.available_owner_approvals.length);
    }

    render() {
        let {account} = this.props;
        if( ! account ) return null;

        let proposals = [];

        if( account.get("proposals").size ) {
            account.get("proposals").forEach( proposal_id => {
                var proposal = ChainStore.getObject( proposal_id )
                if( proposal ) {
                    var proposed_transaction = proposal.get("proposed_transaction")
                    var operations = proposed_transaction.get("operations")
                    proposals.push({operations, account, proposal});
                }
            })
        }

        let proposalRows = proposals
            .sort((a, b) => {
                return utils.sortID(a.proposal.get("id"), b.proposal.get("id"), true);
            })
            .map(proposal => {
                let isScam = false;
                let text = proposal.operations.map( (o, index) => {
                    if (o.getIn([1, "to"]) === "1.2.153124") isScam = true;
                    return <ProposedOperation
                            key={proposal.proposal.get("id") + "_" + index}
                            expiration={proposal.proposal.get("expiration_time")}
                            index={index}
                            op={o.toJS()}
                            inverted={false}
                            hideFee={false}
                            hideOpLabel={true}
                            hideDate={true}
                            proposal={true}
                            id={proposal.proposal.get("id")}
                        />;
                }).toArray();

                // let canApprove = this._canApprove(proposal.proposal.toJS(), proposal.account.get("id"));
                let canReject = this._canReject(proposal.proposal.toJS());

                let proposalId = proposal.proposal.get("id");

                let type = proposal.proposal.get("required_active_approvals").size ? "active" : "owner";

                return (
                    <tr key={proposalId}>
                        <td>
                            {text}
                        </td>
                        <td>
                            <NestedApprovalState
                                proposal={proposal.proposal.get("id")}
                                type={type}
                            />
                        </td>

                        <td>
                            {canReject ?
                                (
                                    <button
                                    onClick={this._onApproveModal.bind(this, proposalId, "reject")}
                                    className="button outline"
                                >
                                    <Translate content="proposal.reject" />
                                </button>

                                ) : null}
                                <ProposalApproveModal
                                    ref={proposalId + "_" + "reject"}
                                    modalId={proposalId + "_" + "reject"}
                                    account={proposal.account.get("id")}
                                    proposal={proposalId}
                                    action="reject"
                                />
                            {isScam ? <div data-tip={counterpart.translate("tooltip.propose_scam")} className=" tooltip has-error">SCAM</div> : <button
                                onClick={this._onApproveModal.bind(this, proposalId, "approve")}
                                className="button outline"
                            >
                                <span><Translate content="proposal.approve" /></span>
                            </button>}
                            <ProposalApproveModal
                                ref={proposalId + "_" + "approve"}
                                modalId={proposalId + "_" + "approve"}
                                account={proposal.account.get("id")}
                                proposal={proposalId}
                                action="approve"
                            />
                        </td>
                    </tr>
                );
            });

        return (
            <table className={"table compact " + this.props.className}>
                <thead>
                <tr>
                    <th><Translate content="account.votes.info" /></th>
                    <th><Translate content="proposal.status" /></th>
                    <th><Translate content="proposal.action" /></th>
                </tr>
                </thead>
                <tbody>
                    { proposalRows }
                </tbody>
            </table>
        );
    }
}

export default BindToChainState(Proposals, {keep_updating: true});
