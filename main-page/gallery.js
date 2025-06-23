const sideFlexContainer1 = document.querySelector(
  ".gallery-side-flex",
);

const sideFlexContainer2 = document.querySelector(
  ".gallery-side-flex:nth-child(3)",
);

const centerFlexContainer = document.querySelector(
  ".gallery-center-flex",
);

let picturesArr = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

for (let i=0; i<15; i++){
    const img = document.createElement('img');
    img.classList.add('gallery-element');
    img.src = `/Project1-Museum/images/pictures/gallery/galery${i+1}.jpg`;
    img.alt = `galery${i+1}`;
    picturesArr.push(img);
};

shuffle(picturesArr);

for (let i=0; i<5; i++){
    sideFlexContainer1.append(picturesArr[i]);
    centerFlexContainer.append(picturesArr[i+5]);;
    sideFlexContainer2.append(picturesArr[i+10]);
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                entry.target.classList.add('in-view');
            } else{
                entry.target.classList.remove('in-view');
            }
        })
    },
    {
        rootMargin: '0px',
        threshold: [0, 0.1, 1],
    },
);

const tags = document.querySelectorAll('.gallery-element');

tags.forEach((tag) => {
    observer.observe(tag);
});


