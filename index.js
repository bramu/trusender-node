'use strict';

var request = require('request');

class TruSender {

  static sendEvent(authToken, name, emailAddress, properties, callback) {
	var data = {
	  "auth_token": authToken,
	  "email": emailAddress,
	  "name": name,
	  "properties": properties
	};

	if (typeof(emailAddress) == "undefined" || emailAddress == null || emailAddress.trim() == "") {
		callback({
			success: false,
			message: 'SendEvent : Email is null!!' + name
		});
	}
	
	request({
		url: 'https://api.trusender.com/v1/sendEvent',
		method: "POST",
		json: data
	}, function(err, response, body) {
	  if (err) {
		console.error('Error connecting Event Server!');
		callback({
		  success: false,
		  message: 'Error connecting Event Server!'
		})
	  } else {
			if (response.statusCode == 200) {
				callback({
					success: true,
					message: 'Successfully added event!'
				});
			} else if (response.statusCode == 422) {
				callback({
					success: false,
					message: JSON.parse(body).error
				});
			} else {
				callback({
					success: false,
					message: 'SendEvent : Oops Something went wrong!!',
					data : JSON.stringify(data),
					response : JSON.stringify(response),
					error : JSON.stringify(body)
				});
			}
		}
	});

  }

  static sendEmail(authToken, templateName, toAddress, dataMapping, callback) {
	// validations for not empty for any of the variables and also formatting
	var data = {
	  "auth_token": authToken,
	  "template_name": templateName,
	  "email": toAddress,
	  "data_mapping": dataMapping
	};

	request({
		url: 'https://api.trusender.com/v1/sendEmail',
		method: "POST",
		json: data
	}, function(err, response, body) {

	  if (err) {
		console.error('Error connecting Mail Server!');
		callback({
		  success: false,
		  message: 'Error connecting Mail Server!'
		})
	  } else {
		if (response.statusCode == 200) {
			callback({
				success: true,
				message: 'Successfully sent the email!'
			});
		} else if (response.statusCode == 422) {
		  console.error(JSON.parse(body).error);
		  callback({
			success: false,
			message: JSON.parse(body).error
		  });
		} else {
			console.log(err, response, body);
		  console.error('SendEmail : Oops Something went wrong!!');
		  callback({
			success: false,
			message: 'SendEmail : Oops Something went wrong!!'
		  });
		}
	  }
	});

  }
}

module.exports = TruSender;
