# Features to build eventually

- Archiving/Statuses for Leads
- Email this lead to me -- look at nodemailer (https://github.com/sahat/hackathon-starter/blob/master/controllers/contact.js)
- Count of emails per user

# Implementing with cURL

// Submit the user's information to Lead Backup system
$curl_options = array(
	CURLOPT_URL => 'http://api.jongamble.com/api/newLead/' + clientID,
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => http_build_query(array(
		'Email' =>  $email,
		'Name' => $user_name,
		'Phone' => $phone,
		'Address' => $address,
		'City' => $city,
		'Zip' => $zip,
		'Interests' => $interests,
		'Comments' => $comment
	
	)),
	CURLOPT_RETURNTRANSFER => true
);
$ch = curl_init();
curl_setopt_array($ch, $curl_options);
$curl_out = curl_exec($ch);
if(!$curl_out){
	mail('jon@trimarkdigital.com', 'Unsuccessful Lead Backup on Site Name', 'Lead Backup failed at '.date("Y-m-d H:i:s"));
}


# Implementing with AJAX

var formData = $(this).serializeArray();
clientID = 'insert client id here';
console.log(formData);

$.ajax({
	type: 'POST',
	data: formData,
	url: 'http://api.jongamble.com/api/newLead/' + clientID,
	crossDomain : true,
	dataType: 'JSON'
});