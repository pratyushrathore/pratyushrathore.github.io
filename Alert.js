function alert_gentle( alert_string )
{
	error_paragraph = document.getElementById( "error_string" );
	error_paragraph.innerHTML = alert_string;
	error_paragraph.focus(  );
}
