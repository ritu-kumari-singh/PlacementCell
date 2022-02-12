async function display_jobs() {
  //fetch software jobs available in india and display in a list
    let response = await fetch("https://api.adzuna.com/v1/api/jobs/in/search/1?&results_per_page=20&content-type=application/json&app_id=022610af&app_key=9ee2ac35dbc375eccb9f07bf1f64da2d&what=software%20developer&where=india");
    response = await response.json();

    let result = response.results;
    console.log(result);

    for(let i=0; i<result.length; i++) {
      document.getElementById('jobs_list').innerHTML += '<button class="collapsible">'+result[i].company.display_name+'('+result[i].contract_time+') - '+result[i].location.display_name+'</button>'
                +'<div class="content">'
                    +'<p>JOB DESCRIPTION : </p>'
                    +'<p>'+result[i].description+'</p>'
                    +'<a href='+result[i].redirect_url+' target="_blank">View Job</a>'
                +'</div>';
    }

    //handle list item expansion and collapsing
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
             
}

display_jobs();