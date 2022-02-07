// Write Something
const subjectName = document.querySelector("#subject_name");
const subjectScore = document.querySelector("#subject_score");
const gpaUsa = document.querySelector(".item__usa");
const gpaStandard = document.querySelector(".item__standard");
const subjectList = [];

const Subject = function (event) {
  event.preventDefault();
  var html, newHtml, fields, fieldsArr, ID;
  const nameValue = subjectName.value;
  const scoreValue = parseFloat(subjectScore.value);
  if(scoreValue == null || isNaN(scoreValue)){
    alert("Please Fill All Required Field");
    return false;
  }else{
    if (subjectList.length > 0) {
      ID = subjectList[subjectList.length - 1].id + 1;
    } else {
      ID = 0;
    }
  
    const subject = {
      id: ID,
      name: nameValue,
      score: scoreValue,
    };
    subjectList.push(subject);
  
    html =
      '<div class="item clearfix" id="subject-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-trash"></i></button></div></div></div>';
    newHtml = html.replace('%id%', subject.id);
    newHtml = newHtml.replace("%description%", subject.name);
    newHtml = newHtml.replace("%value%", subject.score);
    document.querySelector(".subject__list").insertAdjacentHTML("beforeend", newHtml);
  
    const gpa = GPA(subjectList);
    updateUsaGPA(gpa);
    updateStandardGPA(gpa);
  
    fields = document.querySelectorAll("#subject_name" + ", " + "#subject_score");
    var fieldsArr = Array.prototype.slice.call(fields);
  
    fieldsArr.forEach(function (current, index, array) {
      current.value = "";
    });
    fieldsArr[0].focus();
  }
};

const GPA = (scores) => {
  var total = 0;
  for (let index = 0; index < scores.length; index++) {
    total = total + scores[index].score;   
  }
  const temp = total / scores.length;
  return temp;
};

var updateUsaGPA = function (gpa) {
  
    if (gpa >= 9 && gpa < 11) {
      gpaUsa.textContent ="GPA " + gpa + " is: A+ <=> 4.0" + " Điểm bạn Xuất sắc! <=> Outstanding";
      
    }
    if (gpa >= 8 && gpa < 9) {
      gpaUsa.textContent ="GPA " + gpa + " is: A <=> 3.5" + " Điểm bạn Giỏi! <=> Excellent / Very Good";
      
    }
    if (gpa >= 7 && gpa < 8) {
      gpaUsa.textContent ="GPA " + gpa + " is: B+ <=> 3.0" + " Điểm bạn Khá! <=> Good";
    }
    if (gpa >= 6 && gpa < 7) {
      gpaUsa.textContent ="GPA " + gpa + " is: B <=> 2.5" + " Điểm bạn Trung Bình! <=> Average";
    }
    if (gpa >= 5 && gpa < 6) {
      gpaUsa.textContent ="GPA " + gpa + " is: C <=> 2.0" + " Điểm bạn Yếu! <=> Marginal";
    }
    if (gpa < 5) {
      gpaUsa.textContent ="GPA " + gpa + " is: D <=> 1.0" + " Điểm bạn Kém! <=> Fail";
    }
};
var updateStandardGPA = function (gpa) {
    if (gpa >= 8 && gpa <= 10) {
      gpaStandard.textContent = "GPA " + gpa + " is: A <=> 4.0" + " Điểm bạn Giỏi! <=> Excellent / Outstanding";
    }
    if (gpa > 6.4 && gpa < 8) {
      gpaStandard.textContent = "GPA " + gpa + " is: B <=> 3.0" + " Điểm bạn Khá! <=> Good";
    }
    if (gpa > 4 && gpa < 6.5) {
      gpaStandard.textContent = "GPA " + gpa + " is: C <=> 2.0" + " Điểm bạn Trung Bình! <=> Average";
    }
    if (gpa > 3 && gpa < 5) {
      gpaStandard.textContent = "GPA " + gpa + " is: D <=> 1.0" + " Điểm bạn Yếu! <=> Marginal";
    }
    if (gpa < 4) {
      gpaStandard.textContent = "GPA " + gpa + " is: F" + " Điểm bạn Kém! <=> Fail";
    }
};

const DeleteItem = function (event){
  var itemID, splitID, ID;

  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

  if (itemID) {
      splitID = itemID.split('-');
      ID = parseInt(splitID[1]);
      
      // 1. delete the item from the data structure
      var ids, index;
      ids = subjectList.map(function(current) {
        return current.id;
      });
    
      index = ids.indexOf(ID);

      if (index !== -1) {
        subjectList.splice(index, 1);
      }
      
      // 2. Delete the item from the UI
      var el = document.getElementById(itemID);
      el.parentNode.removeChild(el);
           
      // 3. Update and show the new budget
      const gpa = GPA(subjectList);
      updateUsaGPA(gpa);
      
      // 4. Calculate and update percentages
      updateStandardGPA(gpa);
  }
  if(subjectList.length < 1){
    gpaUsa.textContent = "Add subjects for GPA calculation";
    gpaStandard.textContent = "Add subjects for GPA calculation";
  }
  console.log(subjectList);
};

document.querySelector("#btn").addEventListener("click", Subject);
document.querySelector(".subject").addEventListener("click", DeleteItem);
