// PLUGIN_INFO {{{
let PLUGIN_INFO = xml`
<VimperatorPlugin>
      <name>idict</name>
      <name lang="cn">idict</name>
      <description>lookup words in dict.youdao.com.</description>
      <description lang="cn">在有道词典中查询</description>
      <version>1.0.0</version>
      <author mail="nkuysharp@gmail.com" homepage="">Ysharp</author>
      <minVersion>3.9</minVersion>
      <maxVersion>3.9</maxVersion>
      <detail lang="cn"><![CDATA[
          == Command ==
          :idict [<query>]
	  search query in https://dict.youdao.com.
	  The result is presented in popup iframe on the right side of the current page.

	  :nodict
	  hide the result iframe.
	  
        ]]></detail>
    </VimperatorPlugin>`;
// }}}


var Dictionary = {
    init: functiot() {
	//this.document = gBrowser.contentDocument;
	this.ifrId = "youdict";
    },
    search: function(baseUrl, query)
    {
	if(this.isActive())
	{
	    this.changeFrameSrc(baseUrl, query);
	}
	else
	{
	    this.createFrame(baseUrl, query);
	}
    },
    createFrame: function(baseUrl, query)
    {
	var document = gBrowser.contentDocument;
	var ifr = document.createElement("iframe");
	ifr.id = this.ifrId;
	ifr.setAttribute("src", baseUrl+encodeURIComponent(query));
	ifr.style.width="30%";
	ifr.style.height="90%";
	ifr.style.position="fixed";
	ifr.style.top = "20px";
	ifr.style.right = "20px";
	ifr.style.backgroundColor = 'white';
	ifr.style.scrolling = "no";
	ifr.style.zIndex = "999";
	ifr.style.padding = "10px";
	ifr.style.webkitBorderRadius = "20px";
	ifr.style.borderRadius = "20px";
	ifr.style.borderStyle = "solid";
	ifr.style.borderColor = "black";
	ifr.style.overflow = "hidden";
	ifr.frameBorder = '5px';
	ifr.allowTransparency = 'false';
	document.body.appendChild(ifr);
    },
    isActive: function()
    {
	var document = gBrowser.contentDocument;
	var ifr = document.getElementById(this.ifrId);
	if(ifr === null) return false;
	else return true;
    },
    changeFrameSrc: function(baseUrl, query)
    {
	var document = gBrowser.contentDocument;
	var ifr = document.getElementById(this.ifrId);
	if(ifr === null)
	    liberator.echo("error[idict.changeFrameSrc]: cannot find iframe");
	else
	{
	    ifr.setAttribute("src", baseUrl+encodeURIComponent(query));
	    ifr.style.display = '';
	}
    },
    hide:  function()
    {
	var document = gBrowser.contentDocument;
	var ifr = document.getElementById(this.ifrId);
	if(ifr != null)
	{
	    ifr.style.display = 'none';
	}
    }
};

Dictionary.init();

commands.addUserCommand(
    ['idict'],
    'lookup youdao dictionary',
    function(args) {
	var baseUrl = "https://dict.youdao.com/search?q=";
	var query = args.string;
	Dictionary.search(baseUrl, query);
    }
);

commands.addUserCommand(
    ['hidedict'],
    'hide youdao dictionary',
    function(args) {
	Dictionary.hide();
    }
);


