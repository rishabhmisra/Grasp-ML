const card = document.getElementById('card');

$.get('https://rishabhmisra.github.io/Machine-Learning-Glossary/', function(response) {
	var parser = new DOMParser();

	// element to contain card definition
  	let card_definition = document.createElement('card_definition'), span = document.createElement('span');

  	// retrieve all the definitions for each letter and clean up the extra elements
  	var card_content_all = parser.parseFromString(response, 'text/html').getElementsByTagName('ul');
  	var card_content_relevant = []

  	for (var i = 0; i < card_content_all.length; i++) {
  		if (!(card_content_all[i].textContent == null || card_content_all[i].textContent.trim().startsWith("Also see:") 
  				|| card_content_all[i].textContent.trim().startsWith("Useful links:"))) {
  			card_content_relevant.push(card_content_all[i])
  		}
  	}
    // generate random position to choose a letter
	var position = Math.floor(Math.random() * card_content_relevant.length);
	
	// extract the definition for the chosen letter
	var content = parser.parseFromString(card_content_relevant[position].innerHTML, 'text/html').getElementsByTagName('li');

	var card_content_candidates = []
	
	for (var i = 0; i < content.length; i++) {
  		if (!(content[i].textContent == null || content[i].textContent.startsWith("Also see") || content[i].textContent.startsWith("Useful links:"))) {
  			card_content_candidates.push(content[i])
  		}
  	}
	
	// generate random position to choose a definition within the letter
	var list_position = Math.floor(Math.random() * card_content_candidates.length);

	// update card_definition's content
	span.innerHTML = card_content_candidates[list_position].innerHTML;

	// modify the links to point to the blog
	span.innerHTML = span.innerHTML.replace(/#/g, function(match) { return "https://rishabhmisra.github.io/Machine-Learning-Glossary/#" })
	
	// add definition into html structure
	card_definition.appendChild(span);
	card.appendChild(card_definition);
	card.className = 'card_general';
});