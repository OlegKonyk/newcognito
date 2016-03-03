angular.module('app').factory('ncBlogService', function($resource){
	var BlogResource = $resource('/api/posts/:id', {_id: "@id"}, {
		query: {method: 'GET', isArray: false}
	});

	return BlogResource;
})