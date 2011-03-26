IAR.ui.GoalForm = Ext.extend(Ext.Panel,{
	fullscreen: true,
	scroll: 	"vertical",
	layout: 	"card",
	id:			"goalformpanel",
	initComponent: function() {
		this.goalformnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Add/Edit Goal",
			items: 	[
				{
					text: 	"Back",
					id:		"goalformbackbutton",
					handler: function() {
						Ext.getCmp("goalpanel").setActiveItem(0,"flip");
					}
				}, 
				{xtype: 'spacer'},
				{
					xtype: 	'button',
					text:	'Save',
					ui: 	"confirm",
					id:		"goalsavebutton",
					listeners: {
						tap: function() {
							var form = Ext.getCmp("goalform");
							var f = form.items.items[0].items;
							if(f.items[0].getValue()=="") {
								var win = new Ext.MessageBox();
								win.alert("Hey!","Please enter a title");
								return false;
							}
							if(f.items[1].getValue()=="") {
								var win = new Ext.MessageBox();
								win.alert("Hey!","Please enter a description");	
								return false;
							}
							if(f.items[2].getValue()=="" || f.items[2].getValue() <1 || isNaN(f.items[2].getValue())) {
								var win = new Ext.MessageBox();
								win.alert("Hey!","Please enter a goal (needs to be a number, btw)");	
								return false;
							}
							if(f.items[6].getValue()=="") {
								var win = new Ext.MessageBox();
								win.alert("Hey!","Please enter some completion text");
								return false;
							}
							if(f.items[8].getValue()=="") {
								Ext.getCmp("goalpanel").addgoal(f);	
							}
							else {
								Ext.getCmp("goalpanel").savegoal(f);		
							}
						}
					}
				}		
			]
		});
		this.dockedItems = [this.goalformnav];
		this.items = [
			{
				xtype: "form",
				id: "goalform",
				fullscreen: true,
				scroll: "vertical",
				items: [
					{
						xtype: "fieldset",
						items: [
							{
								xtype: 'textfield',
								name : 'title',
								label: 'Title'
							},
							{
								xtype: 'textareafield',
								name : 'description',
								label: 'Details'
							},
							{
								xtype: 'textfield',
								name : 'threshold',
								label: 'Goal'
							},
							{
								xtype: 'selectfield',
								name : 'type',
								label: 'Type',
								options: [
									{text: 'Pages',  value: 'pages'},
									{text: 'Books', value: 'books'}
								]
							},
							{
								xtype: "selectfield",
								name:	"category_id",
								label:	"Category",
								displayField: "category",
								valueField: "id",
								store:	categorystore
							},
							{
								xtype: "container",
								cls: 	"floating-container",
								items: [
									{
										xtype: "textfield",
										name:  "imagesearchvalue",
										id:		"imagesearchvalue",
										disabled: true,
										label:  ".",
										placeHolder: "Select Image",
										value:	"No Image Selected"
									},
									{
										xtype: 	"button",
										name:	"selectimage",
										cls: 	"floating-button",
										iconCls: "search",
										iconMask: true,
										ui: 	"confirm",
										handler: function() {
											Ext.getCmp("goalpanel").setActiveItem(3,"flip");	
										}
									}
								]
							},
							{
								xtype: 'textareafield',
								name : 'completetext',
								label: 'Success Text'
							},
							{
								xtype: "hiddenfield",
								name:  "oldtitle"
							},
							{
								xtype:	"hiddenfield",
								name:	"id"
							}
						]
					}
				],
				submitOnAction: false
			}
		];
		IAR.ui.GoalForm.superclass.initComponent.call(this);
	}
});