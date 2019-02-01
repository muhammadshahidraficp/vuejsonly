var app= new Vue({
	el:'#app',
	data:{ 
		title:"",
		count:"",
		editview:false,
		addview:true,
		status:true,
		movies:[],
		newdata:{
			title:"",
			count:""
		},
		clickeduser:{}

	},
	mounted:function(){
		//console.log("Hello world");
		this.Display();
	},
	methods:{
		Display: function(){
			//console.log("Hello")
			var vm = this
			axios.get("http://symfony4.local/index.php/movies").then(function(response){
				//console.log("dtdtedrtertertetert");
				vm.movies = response.data
				console.log(movies)
				
			});
		},
		saveuser: function(){
			//console.log(app.newdata)
			var formData=app.toFormData(app.newdata)
			axios.post("http://symfony4.local/index.php/movies",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				if(response){
					app.Display()
					status=false
							
				}
				else{
					status=true
				}
				app.newdata={title:"",count:""}
			});

		},
		toFormData:function(obj){
			var form_data=new FormData();
				for(var key in obj){
					form_data.append(key,obj[key]);
				}
				return form_data;
		},

		selectuser: function(movie){
			app.clickeduser=movie
		},
		deleteUser: function(){
			var formData=app.toFormData(app.clickedUser)
			axios.post("http://symfony4.local/index.php/movies",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				app.clickedUser={};
				if(response.data.error){
					app.errorMessage=response.data.message;
				}
				else{
					app.successMessage=response.data.message;
					app.Display();
				}
			});

		},
		updateUser: function(){
			console.log(app.newdata)
			var formData=app.toFormData(app.clickeduser)
			axios.post("http://symfony4.local/index.php/movies/",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				app.clickeduser={}
				if(response){
					
				}
				else{
					app.Display();
				}
			});

		}
	}
	});	