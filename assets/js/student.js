//Handle addition of new student
document.getElementById('add_new_student').onclick = function() {
    document.getElementById('student_list').style.display = "none";
    document.getElementById('add_new_student').style.display = "none";
    document.getElementById('download_all_data').style.display = "none";
    document.getElementById('new_student_form').style.display = "block";
}
//handle csv download of all students' report
document.getElementById('download_all_data').onclick = function(){
    $.ajax({
        type : "POST",
        url : '/users/students/download_all_data',
        success : function(data){
            create_csv(data[0].data, "All_student_report");
        },
        error : function(e){
            //Display error if ajax fails
            console.log(e);
        }
    })
}

document.onclick = function(e){
    //handle csv download of individual students
    if(e.target.classList[0] == "download") {
        let id = e.target.dataset.id;
        ajax_data = {
            "id" : id
        }
        $.ajax({
			type : "POST",
			url : '/users/students/download_csv',
			data : {
                "ajax_data" : ajax_data
            },
			success : function(data){
                create_csv(data[0].data, "Single_student_report");
			},
			error : function(e){
                //Display error if ajax fails
				console.log(e);
			}
        })
    }
}
//function to download csv
var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
}

function create_csv(data, title) {
    //define the heading for each row of the data  
    let csv = "Student_id,Student_name,Student_college,Student_status,DSA_Final_Score,WebD_Final_Score,React_Final_Score,Interview_Date,Interview_Company,Interview_Student_Result\n";
    
    let csvData = [];
    if(data.length == undefined) {
        data = [data];
    }
    for(let i=0;i<data.length;i++) {
        let student = data[i];
        let college = student.college.replace(',',' ');
        if(student.interviews.length == 0) {
            let row = [student._id,student.name,college,student.status,student.dsa,student.web_d,student.react,'N/A','N/A','N/A'];
            csvData.push(row);
        }
        for(let j=0; j<student.interviews.length; j++){
            let index = student.interviews[j].students.indexOf(student._id);            
            let row = [student._id,student.name,college,student.status,student.dsa,student.web_d,student.react,student.interviews[j].date,student.interviews[j].company,student.interviews[j].results[index]];
            csvData.push(row);
        }
    }
    //merge the data with CSV  
    csvData.forEach(function(row) {  
        csv += row.join(',');  
        csv += "\n";  
    });  
    download(csv, title+'.csv', 'text/csv;encoding:utf-8');
}