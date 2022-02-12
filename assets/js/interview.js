// Click event to add new interview 
document.getElementById('add_new_interview').onclick = function() {
    //Remove other elements and display only new interview form
    document.getElementById('interview_list').style.display = "none";
    document.getElementById('add_new_interview').style.display = "none";
    document.getElementById('add_student').style.display = "none";
    document.getElementById('new_interview_form').style.display = "block";
}
//click event to add new student
document.getElementById('add_student').onclick = function() {
    //Remove other elements and display only new student form
    document.getElementById('interview_list').style.display = "none";
    document.getElementById('add_new_interview').style.display = "none";
    document.getElementById('add_student').style.display = "none";
    document.getElementById('student_to_interview_form').style.display = "block";
}

document.onclick = function(e) {
    //handle editing of result status from list itself
    if(e.target.className == "fa fa-pencil") {
        e.target.previousElementSibling.style.display = "inline-block";
        e.target.style.display = "none";
    }
    //handle update of edited result
    if(e.target.className == "fa fa-check") {
        let result = e.target.previousElementSibling.value;
        let studentId = e.target.dataset.studentid;
        let interviewId = e.target.dataset.interviewid;
        e.target.parentElement.previousElementSibling.innerText = "Result : "+result;
        e.target.parentElement.nextElementSibling.style.display = "inline-block";
        e.target.parentElement.style.display = "none";
        //send update result to server for database update
        ajax_data = {
            "result" : result,
            "studentId" : studentId,
            "interviewId" : interviewId
        }
        $.ajax({
			type : "POST",
			url : '/users/interviews/update_result',
			data : {
                "ajax_data" : ajax_data
            },
			success : function(data){
                
			},
			error : function(e){
                //Display error if ajax fails
				console.log(e);
			}
        })
    }
}