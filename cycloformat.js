const cycloFormat = ( function(){

	const accountingJSScript = document.createElement("script");

	accountingJSScript.src = "https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.1/accounting.min.js";
	accountingJSScript.async = true;

	document.body.appendChild(accountingJSScript);
	let timeOut;

	const beginFormating = function(event_type = null,input_element, data){
		let result;
		if(event_type === "keyup"){
			result = accounting.formatMoney(data);
		}

		input_element.value = result;

		clearTimeout(timeOut)

		return null;

	}


	const listenAndFormatInput = function(input_element){

		const allowed_events = ["blur", "keyup"];

		let final_result = ""
		for(let i = 0; i < allowed_events.length; i++){
			input_element.addEventListener(allowed_events[i], function(event){
				
				if(event.type === "keyup"){
					

					if(event.keyCode === 8){
						console.log("hjey")
						//backspace pressed
						clearTimeout(timeOut)

						//remove formatting
						let unformat_result = accounting.unformat(input_element.value.trim())

						console.log(unformat_result)

						if(isNaN(unformat_result)){
							input_element.value = ""
						}else{
							input_element.value = unformat_result;
						}

						

						timeOut = setTimeout(function(){
									
							//begin the format only when the counting is greater than 3..
							if(input_element.value.trim().length >= 3){
								beginFormating("keyup", input_element, unformat_result);
		
							}else{
								clearTimeout(timeOut)
							}
							
							}, 5000)

					}else{
						//pick the element entered
						if(input_element.value.trim().length > 0){
							
							console.log(input_element.value)
							let unformat_result = accounting.unformat(input_element.value.trim())
							
							clearTimeout(timeOut)
							timeOut = setTimeout(function(){
									
							//begin the format only when the counting is greater than 3..
							if(input_element.value.trim().length >= 3){
								clearTimeout(timeOut)
								unformat_result = accounting.unformat(input_element.value.trim())
								console.log(unformat_result)
								

								unformat_result = String(unformat_result)

								//put this in the DOM
								//input_element.value = result;
								// final_result += unformat_result;
								// console.log("Result: ", final_result);
								
								beginFormating("keyup", input_element, unformat_result);
							}
							
							}, 5000)
							

						}else{
							clearTimeout(timeOut)
						}

					}


				}

				if(event.type === "blur"){

					clearTimeout(timeOut);
					unformat_result = accounting.unformat(input_element.value.trim())
					beginFormating("keyup", input_element, unformat_result);
					

				}

				
			})
			
		}


		


	}


	return {

		listenAndFormatInput: listenAndFormatInput

	}







}())