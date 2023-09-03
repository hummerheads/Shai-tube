const LoadCategories = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    let categories = data.data;
    categoryALL(categories);

    if(data.status !== true){
        drawingCategory(categories);
    }
}
const LoadCategory = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    let categorys = data.data;
  
    everyButton(categorys);
}
const categoryALL = categories => {

    const categoryVideo = document.getElementById('Videos');
    categoryVideo.innerText = '';
    categories.forEach((category) => {

        const totalTime = category.others.posted_date;
        const totalHours = Math.round(totalTime / 3600);
        const leftTime = Math.round(totalTime % 3600);
        const totalMinutes = Math.round(leftTime / 60);
        const allContainer = document.createElement('div');
        allContainer.classList = 'py-5 mx-auto';
        allContainer.innerHTML = `
        <div class="bg-base-100">
        <div class="relative">
        <figure>
          <img class="h-52 w-80 rounded-xl" src="${category.thumbnail}" alt="" class="py-5" />
        </figure>
        <div class="${totalTime ? "display" : "hidden"} absolute m-1 p-2 right-0 bottom-0 rounded">
        <p class="bg-black text-xs w-full	font-normal	text-white">${totalHours}hrs ${totalMinutes}min ago<p>
        </div>
        </div>
        <div class="flex gap-3 items-center	pt-5 pl-1">
          <div>
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img src="${category.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-base font-bold leading-7">${category.title}</h4>
          </div>
        </div>
        <div class="flex gap-2 pt-2">
          <div>
            <p class="text-sm font-normal pl-12">${category.authors[0].profile_name}</p>
          </div>
          <div class="${category.authors[0].verified ? "display" : "hidden"}">
            <img src="https://file.rendit.io/n/Mzr9aiipeF5qPZ6sQYI4.svg" className="w-5" id="FiRoot"/>
          </div>
        </div>
        <div>
          <p class="text-sm	font-normal	pl-12 pt-2"><span>${category.others.views}</span> views</p>
        </div>
      </div>
        `;
        categoryVideo.appendChild(allContainer);
    })
}
const everyButton = categorys =>{

    let buttonsContainer = document.getElementById('categoryID');

    categorys.forEach((category) => {

       let buttons = document.createElement('div');
       buttons.innerHTML = `
       <button onclick="LoadCategories(${category.category_id})" class="btn bg-grey-100">${category.category}</button>
       `;
       buttonsContainer.appendChild(buttons);
    });
}
const drawingCategory = categories => {

    const categoryVideo = document.getElementById('Videos');
    const drawingcontainer = document.createElement('div');
    drawingcontainer.classList = 'mx-auto w-screen py-52 ';
    drawingcontainer.innerHTML = `
    <div>
        <figure><img class="w-36 mx-auto" src="img/Icon.png" alt=""></figure>
    </div>
    <div>
        <p class="text-4xl font-bold leading-10 text-center">Oops!! Sorry, There is no <br> content here</p>
    </div>
    `;
    categoryVideo.appendChild(drawingcontainer);
}
LoadCategory();
LoadCategories(id);