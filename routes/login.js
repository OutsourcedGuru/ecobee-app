var api = require('../ecobee-api')
  , config = require('../config');

exports.list = function(req, res){
  var tokens = req.session.tokens
    , cookie_refresh = req.cookies.refreshtoken;
  
  if(cookie_refresh || tokens) { // have we already authenticated before? 

		var refresh_token = cookie_refresh || tokens.refresh_token;
		
		api.calls.refresh(refresh_token, function(err, registerResultObject) {
			if(err) { // if we error refreshing the token clear session and re-log
				req.session.destroy();
				res.redirect('/login/getpin');
			} else { // refresh of the tokens was successful to we can proceed to the main app
				req.session.tokens = registerResultObject;
				res.redirect('/thermostats');
			}  	
		});
	} else {
		res.redirect('/login/getpin');
	}
};

exports.create = function(req, res) {
	// get the users login credentials
	var authcode = req.param('authcode')
	  , appKey = config.appKey
	  , scope = config.scope;
  
	api.calls.registerPin(appKey, authcode, function(err, registerResultObject) {
		var tooFast = false;
		if(err) {
			var errorMessage = '';
			
			console.log(err)
			if(err.data && err.data.error && err.data.error === 'slow_down') {
				errorMessage = 'Polling too fast: Please wait ' + req.session.interval + ' seconds before attempting to complete the link again.';
				tooFast = true;
			} else { 
				errorMessage = 'you must first authorize the app on your ecobee portal settings page. Then click the complete link button below.';
			}
			res.render('login/getpin', {
				scopePathName : config.scopePathName,
				companyFooter : config.companyFooter,
				pin: req.session.pin,
				code: req.session.authcode,
				interval: req.session.interval,
				isError: true,
				tooFast: tooFast,
				error: errorMessage
			});

		} else {
			req.session.tokens = registerResultObject;
			res.redirect('/thermostats');
		}  	
	});	
}
exports.error = function(req, res) {
	res.render('login/error', {
		scopePathName : config.scopePathName,
		companyFooter : config.companyFooter
	});
},
exports.getpin = function(req, res) {
	var scope = config.scope
	  , client_id = config.appKey;
	//var scope = 'smartWrite'
	//  , client_id = config.appKey;

	api.calls.getPin(client_id, scope, function(err, pinResults) {
		if(err) res.redirect('/login/error');
		else {
			console.log(pinResults);
			req.session.authcode = pinResults.code;
			req.session.pin = pinResults.ecobeePin;
			req.session.interval = pinResults.interval;
			res.render('login/getpin', {
				scopePathName : config.scopePathName,
				companyFooter : config.companyFooter,
				pin: pinResults.ecobeePin,
				code: pinResults.code,
				interval:pinResults.interval,
				isError: false,
				tooFast : false
			});
		}
	});	
}
