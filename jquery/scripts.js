var postsURL = 'https://jsonplaceholder.typicode.com/posts';
/**
 * Main table to displaying content. 
 */

/**
* TBody tag element of content table. 
*/


$(document).ready(function () { onReady(); });

function onReady() {
	GetPostsHandler();
	//   PostHandlerHandler();
	HidePostsHandler();

	SendPostHandler();

}

function HidePostsHandler() {
	$('#hidePosts').click(function () {
		$('#main').html('');
	});
}

function GetPostsHandler() {
	$('#GetPosts').click(function () {
		$.get(postsURL, function (data, status, xhr) {
			console.log('status: ' + status);
            console.log('xhr: ' + xhr);
            console.log(data);
            let i = 0;
			$(data).each(function (index, el) {
                
                appendPost(el);
                i += 1;
              
			});
		});
	});
}


function SendPostHandler(){

	$('#send').click(function(event){
        event.preventDefault();

		let id = $('#userId').val();
		let body = $('#body').val();
		let title = $('#title').val();

        let obj = {'userId': id, 'body':body,'title':title};
        
		$.post(postsURL,obj,function(data,status,xhr){
			if(xhr.status === 201){
                appendPost(data);
            }else{
                alert('server status returned:\n' + status);
                console.log('another status : ' + JSON.stringify(status));
                console.log('xhr: ' + JSON.stringify(xhr));
            } 
		},'json');
	});
}   
  
function appendPost(el){
	$('#main').append('<tr>' +
    '<td>' + el.id + '</td>' +
    '<td>' + el.title + '</td>' +
    '<td>' + el.body + '</td>' +
    '</tr>');
  
}