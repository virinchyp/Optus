const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        const responseJsonObj = JSON.parse(this.responseText);
        for (let p = 0; p < responseJsonObj.bars.length; p++) {
       
            //Create Progress Bars
            // Create a wrapper div
            const wrapper = document.createElement('div');
            wrapper.className = 'wrapper';
          
            wrapper.setAttribute('id', `Wrapper${p.toString()}`);
            const Progressbar = document.createElement('PROGRESS');
            Progressbar.className = 'progress-bar';
            const idTag = `Progress${p.toString()}`;
            Progressbar.setAttribute('id', idTag);
            Progressbar.setAttribute('value', responseJsonObj.bars[p]);
            Progressbar.setAttribute('max', responseJsonObj.limit);
            // add progress bar to wrapper
            wrapper.appendChild(Progressbar);
            //Create a span to contain the number
            const number = document.createElement('span');
            number.innerText = `${responseJsonObj.bars[p]}%`;
            // add number span to wrapper
            wrapper.appendChild(number);
            const br = document.createElement('br');
            // add wrapper to document.
            document.body.appendChild(wrapper);
            document.body.appendChild(br);
        }

        //Create Drop Down
        const Select = document.createElement('SELECT');
        Select.setAttribute('id', 'selectElement');
        document.body.appendChild(Select);
        let opt = null;
        for (o = 0; o < responseJsonObj.bars.length; o++) {
           
            opt = document.createElement('option');
            opt.value = `Progress${o}`;
            opt.innerHTML = `#Progress${o}`;
            Select.appendChild(opt);
        }
        
        // Creating and handling button clicks 

        for (let  b= 0; b < responseJsonObj.buttons.length; b++) {
            //Create Buttons
            const Button = document.createElement('BUTTON');
            Button.innerHTML = responseJsonObj.buttons[b];
            Button.addEventListener('click', event => {
                //Button Event handling
                const selected_PB_Element = document.getElementById(
                    'selectElement'
                );
               
                const selected_PB_Value = selected_PB_Element.value;
                let currentNode = document.getElementById(selected_PB_Value);

                // Get the next sibling ( the number span)
                let nextSibling = currentNode.nextElementSibling;
                currentNode.value += responseJsonObj.buttons[b];
                console.log(currentNode.value);
                console.log(responseJsonObj.limit);
                // Getting maxValue of the bar
                if (currentNode.value >= responseJsonObj.limit) {
                   
                    currentNode.classList.add('red');
                 
                 } else {
                   currentNode.classList.remove("red");
                }
                // Also set the text of the number span
                nextSibling.innerText = `${currentNode.value}%`;
            });
            document.body.appendChild(Button);
        }
    }
};
xmlhttp.open('GET', 'http://pb-api.herokuapp.com/bars', true);
xmlhttp.send();
