IAR.App = Ext.extend(Ext.TabPanel, {
	fullscreen:	true,
	id:	"masterpanel",
	layoutOnOrientationChange: true,
	ui:	"charcoalpink",
	cardSwitchAnimation: "slide",
	initComponent: function() {
		this.items = [	
			new IAR.ui.HomeCard(),
			new IAR.ui.BookCard(),
			new IAR.ui.AwardCard(),
			new IAR.ui.GoalCard(),
			new IAR.ui.SettingsCard()
		],
		this.tabBar = {
			dock: 	"bottom",
			layout: {pack:"center"}
		},
		IAR.App.superclass.initComponent.apply(this,arguments);
		Ext.getCmp("goalpanel").checkgoals();
		this.doComponentLayout();
		this.setBadge();		
	},
	setBadge: function() {
		var goals = Ext.StoreMgr.getByKey("goalstore");
		goals.filter("hasseen","false");
		this.tabBar.items.items[3].setBadge(goals.getCount());
		goals.clearFilter();
		goals.sort();
	}
});