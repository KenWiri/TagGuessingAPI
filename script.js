   

    const list = document.getElementById("pictureList");

    const tagList=document.getElementById("tagList");

// options for users to answer

    const optionsGiven = ['Obama','Donald','Trump','Hillary','Putin','Trudeau'];
    const randomWord = createRandomTag(optionsGiven);
    createButton(optionsGiven); // to create buttons for the five different options

// Tumblr API library
    getTaggedePhotos(randomWord);


// turn each item in the array into clickable buttons for player/user to click
     function createButton(optionsGiven){
        for (let i = 0; i <optionsGiven.length; i++) {
            const button = document.createElement('button');
            button.setAttribute('type', 'submit');
            button.innerHTML = optionsGiven[i];
            button.classList.add('buttonStyle');
            tagList.appendChild(button);
        }
    }
    

    const button = document.querySelectorAll('.buttonStyle');
    
    for (let i = 0; i<button.length; i++){
        let item = button[i];
        
        item.onclick = function(event){
            event.preventDefault();

            const elemClickedOn = event.target;

            userGuess = elemClickedOn.innerHTML;
            correctAnswer = randomWord;

            checkAnswer(userGuess,correctAnswer);
        }
    }

// This is the function that fetches tags from Tumblr using my unique key
    function getTaggedePhotos(tagName) {
        fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=nDyNYIx6W8FFkaCCdIP36222htrVE8QrOCpkgArLE9tPx3Khu5')
        .then(function(response) {         
                    return response.json(); // make the response viewable in json format
                })
        .then(function(result) {
                
                    const items = result.response;

                    for(let i =0; i<items.length; i++){
                        const item = items[i];
                        
                        if(item.photos!=undefined){

                            const altSizes=item.photos[0].alt_sizes
                            const imgSrc = altSizes[altSizes.length - 2].url;
                            
                            const img = document.createElement('img');

                            img.src= imgSrc;

                            const li = document.createElement('li');
                            li.appendChild(img);
                            //li.innerHTML= imgSrc;
                            list.appendChild(img);
                        }

                    }

                    return items;
                }
            )
    }

    function createRandomTag (optionsGiven) {


        totalTag = (optionsGiven.length);

        return optionsGiven[parseInt(Math.random()*totalTag)];

    }

// to determine the correct answer and to display the corresponding text in the alert box for the player
    function checkAnswer(userGuess,correctAnswer) {

        if(userGuess==correctAnswer) {
            window.alert('You are correct. Well done!');
            window.location.reload(true);

            let randomWord = createRandomTag(optionsGiven);



            return true;
        } // to make people think 'Donald' here refers to Trump but it's referring to Donald the Duck!
            else if(userGuess == "Donald" && correctAnswer == "Trump") {
            window.alert("Oii! I am Donald Duck not Donald Trump. Nice Try!")
            window.location.reload(true);

            return false;


        } else {
            window.alert('Uh oh! The correct answer is ' + correctAnswer);
            window.location.reload(true);
            return false;
        }

    }

