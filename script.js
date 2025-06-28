document.addEventListener("DOMContentLoaded",function(){
    const searchbtn=document.getElementById("search");
    const username=document.getElementById("userid");
    const status=document.querySelector(".status");
    const easyprogress=document.querySelector(".easy");
     const mediumprogress=document.querySelector(".medium");
      const hardprogress=document.querySelector(".hard");
      const easylabel=document.getElementById("easy-label")
const mediumlabel=document.getElementById("medium-label")
const hardlabel=document.getElementById("hard-label")
const card=document.querySelector(".stat-card")

function validateusername(user){
    if(user.trim()===""){
        alert("username shouldn't be empty");
        return false;
    }
    const regex=/^[a-zA-Z0-9 _-]{1,20}$/;
    const ismatch=regex.test(user)
    if(!ismatch){
        alert("Invalid");
    }
    return ismatch;

}
function update(solved,total,label,circle){
const progress=(solved/total)*100;
circle.style.setProperty("--progress-degree",`${progress}%`);
label.textContent=`${solved}/${total}`;
}

function displaydata(data){
    const totalques=data.totalQuestions;
   const totalEasy =data.totalEasy;
const totalMedium =data.totalMedium;
    const totalHard =data.totalHard;
    const totalsolved=data.totalSolved;
    const easysolved=data.easySolved;
    const mediumsolved=data.mediumSolved;
    const hardsolved=data.hardSolved;

    update(easysolved,totalEasy,easylabel,easyprogress);
    update(mediumsolved,totalMedium,mediumlabel,mediumprogress);
    update(hardsolved,totalHard,hardlabel,hardprogress);

    const carddata = [
        {label:"Overall Acceptance" ,value:data.acceptanceRate},
        {label:"Contribution Points",value:data.contributionPoints},
        {label:"Ranking", value:data.ranking},
    ];

    card.innerHTML=carddata.map(
        d=> `
            <div class="cards">
            <h4>${d.label}<h4>
            <p>${d.value}</p>
            </div>`
        
    ).join("")
}

async function fetchdata(user) {
    const url=`https://leetcode-stats-api.herokuapp.com/${user}`
    try{
        searchbtn.textContent="Searching..."
        searchbtn.disabled=true;
        const res=await fetch(url);
        if(!res.ok){
            throw new Error("Unable")
        }
        const data=await res.json();
        console.log(data);

        displaydata(data);
    }
    catch(e){
status.innerHTML="<p>No data found</p>"
    }

    finally{
        searchbtn.textContent="Search"
        searchbtn.disabled=false;
    }
}
    searchbtn.addEventListener('click',function(){
        const user=username.value;
        console.log(user);
        if(validateusername(user)){
            fetchdata(user);
        }
    })
})