
function load_details(  )
{
	set_mode(  );
	load_question(  );
	start_timer(  );
	var text_box = document.getElementById( "input_answer" );
	var check_button = document.getElementById( "check_button" );
	text_box.addEventListener( "keypress", function( e ){ e = e || window.event; if( e.keycode == 13 ) { check_button.click(  );} } );
}


function set_num_problems(  num_problems )
{
	document.getElementById( "num_problems" ).value = num_problems;
}
// set the number of digits to be used
function set_complexity( complexity )
{
	document.getElementById( "complexity" ).value = complexity;
}

function start_timer(  )
{
	var time_elapsed = document.getElementById( "time_elapsed" ).value;
	var date = new Date(  ); 
	var start_time = document.getElementById( "start_time" );
	start_time.value = date.getTime(  ) - time_elapsed;
}

function load_question( )
{
	var question_number = parseInt( document.getElementById( "question_number" ).value );
	var num_problems = parseInt( document.getElementById( "num_problems" ).value ); 
	if( question_number == num_problems)
	{
		var start_time = document.getElementById( "start_time" ).value;
		var date = new Date(  );
		var end_time = date.getTime(  );
		var num_correct = document.getElementById( "num_correct" ).value;
		var time_taken = end_time - start_time;
		var message = "";
		var time_per_problem = time_taken/( 1000 * num_problems );
		if( num_problems >= 25 )
		{
			if( num_correct == num_problems )
			{
				message = "Excellent, keep going!";
				if( time_per_problem < 30 )
				{
					message = "Excellent and fast!";
				}
			}
			else if( num_correct > 0.9 * num_problems )
			{
				message = "Very good, we need 100% accuracy!";
				if( time_per_problem < 30 )
				{
					message = "Very good and that was quite fast!";
				}
			}
			else if( num_correct > 0.7 * num_problems )
			{
				message = "You can do better!";
			}
			else 
			{
				message = "You are having a bad day!";
			}
		}
		var score = num_correct / num_problems * 100;
		var session_scores = document.getElementById( "session_scores" );
		alert_gentle( message + " Your score: " + num_correct + '/' + num_problems + ', you took ' + time_per_problem + " seconds per problem" + session_scores.value ); 
		
		//resetting variables
		document.getElementById( "num_correct" ).value = 0;
		document.getElementById( "start_time" ).value = date.getTime(  );
		document.getElementById( "time_elapsed" ).value = 0;
		document.getElementById( "question_number" ).value = 0;
		session_scores.value = session_scores.value + "<br>( " + score + ", " + time_per_problem + " )";
		question_number = 0;
	}
	document.getElementById( "input_answer" ).value = "";

	var complexity = parseInt( document.getElementById( "complexity" ).value );
	var mode = parseInt( document.getElementById( "mode" ).value );

	switch( mode ){
		case 0:
			load_addition( complexity, question_number + 1 );
			break;
		case 1:
			load_multiplication( complexity, question_number + 1 );
			break;
		case 2:
			load_subtraction( complexity, question_number + 1 );
			break;
		case 3:
			load_division( complexity, question_number + 1 );
			break;
	}
}

function get_random_number( complexity )
{
	var x = 0;
	var y = 0;
	while( x == 0 || y == 0 || x == 1 || y == 1 || x == y )
	{
		x = Math.floor( Math.random(  ) * Math.pow( 10, complexity ) );
		y = Math.floor( Math.random(  ) * 10 );
	}
	return Math.floor( x/y * 100 ) / 100;
}

function load_addition( complexity, question_number )
{
	var n1 = get_random_number( complexity ); 
	var n2 = get_random_number( complexity ); 
	var question = document.getElementById( "question" );		
	question.innerHTML =  question_number + '. ' + "<b>" + n1 + ' + ' + n2 +"</b>"; 
	var answer = document.getElementById( "answer" );
	answer.value = n1 + n2; 
}

function load_subtraction( complexity, question_number )
{
	var n1 = get_random_number( complexity ); 
	var n2 = get_random_number( complexity ); 
	var question = document.getElementById( "question" );		
	question.innerHTML =  question_number + '. ' + "<b>" + n1 + ' - ' + n2 +"</b>"; 
	var answer = document.getElementById( "answer" );
	answer.value = n1 - n2; 
}

function load_multiplication( complexity, question_number )
{
	var n1 = get_random_number( complexity ); 
	var n2 = get_random_number( complexity ); 
	var question = document.getElementById( "question" );		
	question.innerHTML =  question_number + '. ' + "<b>" + n1 + ' * ' + n2 +"</b>"; 
	var answer = document.getElementById( "answer" );
	answer.value = n1 * n2; 
}	

function load_division( complexity, question_number )
{
	var n1 = get_random_number( complexity ); 
	var n2 = get_random_number( complexity ); 
	var question = document.getElementById( "question" );		
	question.innerHTML =  question_number + '. ' + "<b>" + n1 + ' / ' + n2 +"</b>"; 
	var answer = document.getElementById( "answer" );
	answer.value = n1 / n2; 
}

function set_mode(  )
{
	var mode = parseInt( document.getElementById( "mode" ).value );
	var accuracy = document.getElementById( "accuracy" );
	while( accuracy.firstChild )
	{
		accuracy.removeChild( accuracy.firstChild );
	}
	if( mode == 1 || mode == 3 )
	{
		var option_node = document.createElement( "option" );	
		option_node.setAttribute( "value", 5 );
		option_node.innerHTML = "5%";
		accuracy.appendChild( option_node );

		option_node = document.createElement( "option" );	
		option_node.setAttribute( "value", 0 );
		option_node.innerHTML = "Accurate";
		accuracy.appendChild( option_node );
		
		option_node = document.createElement( "option" );	
		option_node.setAttribute( "value", 1 );
		option_node.innerHTML = "1%";
		accuracy.appendChild( option_node );

		option_node = document.createElement( "option" );	
		option_node.setAttribute( "value", 2 );
		option_node.innerHTML = "2%";
		accuracy.appendChild( option_node );
		
	}
	else
	{
		var option_node = document.createElement( "option" );	
		option_node.setAttribute( "value", 0 );
		option_node.innerHTML = "Accurate";
		accuracy.appendChild( option_node );
	}
	load_question(  );
}

function check_answer(  )
{
	var answer = parseFloat( document.getElementById( "answer" ).value );
	var input = document.getElementById( "input_answer" ).value;
	if( input === "" )
	{
		return false;
	}
	var question_number = document.getElementById( "question_number" );
	question_number.value = parseInt( question_number.value ) + 1;
	var input_answer = parseFloat( input );
	var accuracy = parseInt( document.getElementById( "accuracy" ).value );
	
	if( Math.abs( answer - input_answer ) * 100 <= accuracy * answer )
	{
		alert_gentle( "Correct Answer" );
		var num_correct = document.getElementById( "num_correct" );
		num_correct.value = parseInt( num_correct.value ) + 1;
		load_question(  );
	}
	else
	{
		alert_gentle( "Wrong Answer<br> " + document.getElementById( "question" ).innerHTML + " = " + answer );
		setTimeout( load_question, 100 );
	}
	return false;
}

function key_press( e  )
{
	e = e || window.event; 
	if( e.keyCode == 13 )
	{

		return check_answer(  );
	}
}
