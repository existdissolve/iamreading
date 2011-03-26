Ext.ns("IAR", "IAR.ui","IAR.model");
var App = '';
var bookdb = "";
var iardb = "";
var db = "";
var ls 	= localStorage;
var isfbloggedin = false;
if(ls.colorscheme) {
	SwitchStylesheet(ls.colorscheme);	
}
else {
	SwitchStylesheet("pink");		
}
var bs = "";
var is = "";
// load Google search goodness
google.load("search", "1");
// once Google search is loaded, execute callback method to do other stuff
google.setOnLoadCallback(
	function(){
		bs = new google.search.BookSearch();
		bs.setResultSetSize(8)
		is = new google.search.ImageSearch();
		is.setResultSetSize(8)
	}
);

var pageindex = 0;
var imageindex = 0;
var totalpages = 0;
var totalbooks = 0;

Ext.setup({
	tabletStartupScreen: ls.colorscheme != "" ? "images/tablet/tablet_" + ls.colorscheme + ".jpg" : 'images/tablet/tablet_pink.jpg',
    phoneStartupScreen: ls.colorscheme != "" ? "images/phone/phone_" + ls.colorscheme + ".jpg" : 'images/phone/phone_pink.jpg',
	layoutOnOrientationChange:true,
    icon: ls.colorscheme != "" ? "images/icon/icon_" + ls.colorscheme + ".png" : 'images/icon/icon_pink.png',
    glossOnIcon: true,
	onReady: function() {
		App = new IAR.App();
	}
});

function SwitchStylesheet(ss) {
	var root = sencharoot;
	var color = ss;
	var ss = typeof ss != "undefined" ? ss.replace(".css","") +".css" : 'pink.css';
	if(Ext.getDom("masterss").href!=root+ss) {
		Ext.getDom("masterss").href = root+ss;	
		ls.colorscheme = color;
	}
}
function SearchBook(fld) {
	var fld = "searchfield_"+fld;
	var st = Ext.getCmp(fld).getValue();
	Ext.getCmp("searchfield_1").setValue(st);
	Ext.getCmp("searchfield_2").setValue(st);
	if(st=="") {
		return false;	
	}
	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>','loading',false);
	pageindex = 1;
	bs.execute(st);
	bs.setSearchCompleteCallback(this,ShowSearchResults);
}
function ShowSearchResults() {
	var books = {};
	books.results = bs.results;
	var append = pageindex == 1 ? false : true;
	if(bs.results.length) {
		Ext.getCmp("searchmorebutton_1").show();
		Ext.getCmp("searchmorebutton_2").show();
	}
	Ext.getCmp("booksearchlist").getStore().loadData(books.results,append);
	Ext.getCmp("booksearchlist").refresh();
	var sp = Ext.getCmp("bookspanel");
	sp.setActiveItem(2);
	Ext.getBody().unmask();
}
function GetMoreSearchResults() {
	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>','loading',false);
	pageindex = pageindex+1;
	if(pageindex<8) {
		bs.gotoPage(pageindex);
	}
	else {
		Ext.getBody().unmask();
		Ext.getCmp("searchmorebutton_1").hide();	
		Ext.getCmp("searchmorebutton_2").hide();	
	}
}
function SearchImage(fld,e) {
	var st = Ext.getCmp("imagesearch").getValue();
	if(st=="") {
		return false;	
	}
	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>','loading',false);
	imageindex = 1;
	is.execute(st);
	is.setSearchCompleteCallback(this,ShowImageResults);
}
function ShowImageResults() {
	var images = {};
	images.results = is.results;
	var append = imageindex == 1 ? false : true;
	if(is.results.length) {
		Ext.getCmp("imagemorebutton").show();	
	}
	Ext.getCmp("imageview").getStore().loadData(images.results,append);
	Ext.getCmp("imageview").refresh();
	var sp = Ext.getCmp("goalpanel");
	sp.setActiveItem(3);
	Ext.getBody().unmask();
}
function GetMoreImageResults() {
	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>','loading',false);
	imageindex = imageindex+1;
	if(imageindex<8) {
		is.gotoPage(imageindex);
	}
	else {
		Ext.getBody().unmask();
		Ext.getCmp("imagemorebutton").hide();	
	}
}
function ClearImageSearch() {
	var blankimagestore = new Ext.data.Store({
		model: 'Images',
		root: "results",
		id:	"blankimagestore",
		data: []
	});
	Ext.getCmp("imageview").bindStore(blankimagestore);
	Ext.getCmp("imageview").refresh();
	Ext.getCmp("imagemorebutton").hide();
	Ext.getCmp("imagesearch").setValue("");	
}
function Import() {
	db = openDatabase('Books',"",'Book Tracker',2000000);
	ImportBooks();
	ImportGoals();
	var win = new Ext.MessageBox();
	win.alert('Success!', 'Yay! You\'re data was successfully imported!', function(){
		Ext.getCmp("goalpanel").checkgoals();																				   
	});
}
function ImportBooks() {
	var books = Ext.StoreMgr.getByKey("booksstore");
	// get books
	var sqlvars = [];
	var sql = "select * from books order by title";
	db.transaction(function(t){	
		t.executeSql(sql,sqlvars,function(transaction,records) {
			for(var i=0;i<records.rows.length;i++) {
				var bdata = records.rows.item(i);
				books.add({
					bookId: 		bdata.bookid,
					title:			bdata.title,
					authors:		bdata.authors,
					publishedYear:	bdata.publishedyear,
					pageCount:		bdata.pagecount,
					tbUrl:			bdata.thumbnail,
					category_id:	1
				});
				books.sync();
			}							
		});
	});
}
function ImportGoals() {
	var goals = Ext.StoreMgr.getByKey("goalstore");
	// get goals
	var sqlvars = [];
	var sql = "select * from rewards order by title";
	db.transaction(function(t){
		t.executeSql(sql,sqlvars,function(transaction,records) {
			for(var i=0;i<records.rows.length;i++) {
				var gdata = records.rows.item(i);
				goals.add({
					title:		gdata.title,
					description:gdata.description,
					threshold:	gdata.threshold,
					type:		gdata.type,
					category_id:1,
					imageurl:	gdata.imageurl,
					completetext:gdata.completetext,
					hasseen:	gdata.hasseen
				});
				goals.sync();
			}
		});
	});
}