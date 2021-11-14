// functions
const discardTab = (tab) => {
    let id = tab.id;
    chrome.tabs.discard(id);
};
const discardAllOtherTab = () => {
    chrome.tabs.query(
        {
            active: false,
            discarded: false,
            highlighted: false,
            pinned: false,
            audible: false,
        },
        (tabs) => {
            for (backgroundTabs in tabs) {
                discardTab(backgroundTabs);
            }
        }
    );
};

// create context menus
chrome.contextMenus.create({
    title: "Discard Tab",
    contexts: ["all"],
    id: "discard-current-tab",
});
chrome.contextMenus.create({
    title: "Discard All Inactive Background Tab",
    contexts: ["all"],
    id: "discard-all-other-tab",
});

// handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "discard-current-tab":
            discardTab(tab);
            break;
        case "discard-all-other-tab":
            discardAllOtherTab();
            break;
    }
});

// handle shortcuts
chrome.commands.onCommand.addListener((command, tab) => {
    switch (command) {
        case "discard-current-tab":
            discardTab(tab);
            break;
        case "discard-all-other-tab":
            discardAllOtherTab();
            break;
    }
});
