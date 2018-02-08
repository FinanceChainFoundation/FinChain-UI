import React from "react";
import AssetStore from "stores/AssetStore";
import SettingsStore from "stores/SettingsStore";
import AltContainer from "alt-container";
import PresaleCreate from "./PresaleCreate";

class PresaleCreateContainer extends React.Component {

    render() {

        return (
              <AltContainer
                  stores={[AssetStore, SettingsStore]}
                  inject={{
                    assets: () => {
                        return AssetStore.getState().assets;
                    },
                    filterMPA: () => {
                        return SettingsStore.getState().viewSettings.get("filterMPA");
                    },
                    filterUIA: () => {
                        return SettingsStore.getState().viewSettings.get("filterUIA");
                    }
                  }} 
                  >
                <PresaleCreate/>
              </AltContainer>
        );
    }
}

export default PresaleCreateContainer;
