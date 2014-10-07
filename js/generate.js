var k = 0;

function loadAll(){
	getTopStories().then(function(storiesData){
		for (var i = 0; i < storiesData.length; i++) {
			getItemDetails(storiesData[i]).then(function(commentsData){
				if (commentsData.kids !== undefined){
					for (var j = 0; j < commentsData.kids.length; j++) {
						getItemDetails(commentsData.kids[j]).then(function(commentDetail){
							console.log(commentDetail);
						});
					}
				}
			});
		}
	});
}

function getItemDetails(id){
	return new Promise(function(resolve,reject){
		d3.json('https://hacker-news.firebaseio.com/v0/item/' + id + '.json', function(err, data){
			if (err !== null){
				reject(err);
			}
			else{
				resolve(data);
			}
		});
	});
}

function getTopStories(){
	return new Promise(function(resolve,reject){
		d3.json('https://hacker-news.firebaseio.com/v0/topstories.json', function(err, data){
			if (err !== null){
				reject(err);
			}
			else{
				resolve(data);
			}
		});
	});
}