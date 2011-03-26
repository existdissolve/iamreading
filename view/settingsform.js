IAR.ui.SettingsForm = Ext.extend(Ext.Panel,{
	title: 		"Preferences",
	layout: 	"card",
	fullscreen: true,
	id:			"settingform",						 
	initComponent: function() {
		this.settingsnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Preferences",
			items: 	[
				{
					text: 	"Back",
					id: 	"settingsbackbutton",
					handler: function() {
						Ext.getCmp("settingspanel").setActiveItem(0,"flip");	
					}
				}
			]								   
		});
		this.dockedItems = [this.settingsnav];
		this.items = [
			{
				xtype: "form",
				submitOnAction: false,
				fullscreen: true,
				scroll: "vertical",
				items: [
					{
						xtype: "fieldset",
						title: "Theme Color",
						items: [
							{
								xtype: "radiofield",
								label: "Pink",
								name: "colorpreference",
								checked: ls.colorscheme=="pink" ? true : false,
								value: "pink",
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							},
							{
								xtype: "radiofield",
								label: "Green",
								name: "colorpreference",
								value: "green",
								checked: ls.colorscheme=="green" ? true : false,
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							},
							{
								xtype: "radiofield",
								label: "Blue",
								id: 	"blueradio",
								name: "colorpreference",
								value: "blue",
								checked: ls.colorscheme=="blue" ? true : false,
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							},
							{
								xtype: "radiofield",
								label: "Purple",
								id: 	"purpleradio",
								name: "colorpreference",
								value: "purple",
								checked: ls.colorscheme=="purple" ? true : false,
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							},
							{
								xtype: "radiofield",
								label: "Orange",
								id: 	"orangeradio",
								name: "colorpreference",
								value: "orange",
								checked: ls.colorscheme=="orange" ? true : false,
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							},
							{
								xtype: "radiofield",
								label: "Red",
								id: 	"redradio",
								name: "colorpreference",
								value: "red",
								checked: ls.colorscheme=="red" ? true : false,
								listeners: {
									"check": function(chk) {
										SwitchStylesheet(chk.value);	
									}
								}
							}
						]
					},
					{
						xtype: "fieldset",
						title: "Social",
						items: [
							{
								xtype: "container",
								cls: "facebook-container",
								items: [
									{
										xtype: "textfield",
										label: "Facebook",
										disabled: true
									},
									{
										xtype: "button",
										iconCls: "user_add",
										iconMask: true,
										ui: "blue",
										id: "fblogin",
										text: isfbloggedin ? "Logout" : "Login",
										cls: "facebook-button",
										handler: function() {
											var action = isfbloggedin ? "logout" : "login";
											Ext.getCmp("settingspanel").sociallogin(action);	
										}
									}
								]
							}
						]
					}
				]
			}
		];			
		IAR.ui.SettingsForm.superclass.initComponent.call(this);
	}
});