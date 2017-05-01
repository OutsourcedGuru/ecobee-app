var api = require('../ecobee-api')
  , config = require('../config');

exports.list = function(req, res){
  var tokens = req.session.tokens;

  if(!tokens) res.redirect('/login');
  else {
  	// get the list of thermostats
  	var thermostatSummaryOptions = new api.ThermostatSummaryOptions();
	
	api.calls.thermostatSummary(tokens.access_token, thermostatSummaryOptions, function(err, summary) {
		if(err) res.redirect('/login');
		else {
			var thermostatArray = [];
			console.log(summary)
			
			for( var i = 0; i < summary.revisionList.length; i ++) {
				var revisionArray = summary.revisionList[i].split(':');
				thermostatArray.push({ name : revisionArray[1], thermostatId : revisionArray[0]} );
			}
			
			res.cookie('refreshtoken', tokens.refresh_token, { expires: new Date(Date.now() + 9000000)});
			res.render('thermostats/index', {
				thermostats : thermostatArray,
				scopePathName : config.scopePathName,
				companyFooter : config.companyFooter
				});
		}
	});
  	
  }
};

exports.hold = function(req, res) {
	var tokens = req.session.tokens
	  , thermostatId = req.params.id
	  , holdTemp = req.param('holdtemp')
	  , hvacMode = req.param('hvacmode')
	  , thermostats_update_options = new api.ThermostatsUpdateOptions(thermostatId)
	  , desiredCool = 770 // some defaults for these values
	  , desiredHeat = 690;

	if(hvacMode === 'heat' || hvacMode === 'auxHeatOnly') {
		desiredHeat = parseInt(holdTemp, 10) * 10; // our canonical form is F * 10
	} else {
		desiredCool = parseInt(holdTemp, 10) * 10; // our canonical form is F * 10
	}

	var functions_array = [];
	var set_hold_function = new api.SetHoldFunction(desiredCool, desiredHeat,'indefinite', null);
	
	functions_array.push(set_hold_function);

	api.calls.updateThermostats(tokens.access_token, thermostats_update_options, functions_array, null, function(error) {
		if(error) res.redirect('/login');
		else {
			// we set a timeout since it takes some time to update a thermostat. One solution would be to use ajax
			// polling or websockets to improve this further.
			setTimeout(function() {
				res.redirect('/thermostats/' + thermostatId);
			}, 6000)		
		}
	});
}

exports.resume = function(req, res) {
	
	var tokens = req.session.tokens
	  , thermostatId = req.params.id
	  , thermostats_update_options = new api.ThermostatsUpdateOptions(thermostatId)
	  , resume_program_function = new api.ResumeProgramFunction();

	var functions_array = [];
	functions_array.push(resume_program_function);

	api.calls.updateThermostats(tokens.access_token, thermostats_update_options, functions_array, null, function(err) {
		if(err) res.redirect('/login');
		else {
			setTimeout(function() {
				res.redirect('/thermostats/' + thermostatId);
			}, 5000);
		}
	});
}

exports.mode = function(req, res) {
	
	res.redirect('/thermostats');
}

exports.view = function(req, res) {
	var tokens = req.session.tokens
	  , thermostatId = req.params.id
	  , thermostatsOptions = new api.ThermostatsOptions(thermostatId);
	if(!tokens) {
		res.redirect('/login');
	} else {
		api.calls.thermostats(tokens.access_token, thermostatsOptions, function(err, thermostats) {
			if(err) res.redirect('/');
			else {

				var thermostat = thermostats.thermostatList[0]
				  , currentTemp = Math.round(thermostat.runtime.actualTemperature / 10)
				  , desiredHeat = Math.round(thermostat.runtime.desiredHeat / 10)
				  , desiredCool = Math.round(thermostat.runtime.desiredCool / 10)
				  , hvacMode = thermostat.settings.hvacMode
				  , desiredTemp = null
				  , isHold = false
				  , thermostatId = thermostat.identifier
				  , name = thermostat.name
				  , template = null;

				isHold = thermostat.events.length > 0;
				switch(hvacMode) {
					case 'heat':
						desiredTemp = desiredHeat;
						template = 'thermostats/show';
						break;
					case 'cool':
						desiredTemp = desiredCool;
						template = 'thermostats/show';
						break;
					case 'auto':
						desiredTemp = desiredHeat + ' - ' + desiredCool;
						template = 'thermostats/showauto';
						break;
					case 'off':
						desiredTemp = 'Off'
						template = 'thermostats/off';
						break;
					case 'auxHeatOnly':
						desiredTemp = desiredHeat;
						template = 'thermostats/show';
						break;
				} 
				
				res.render(template, {
					thermostat : thermostat, 
					scopePathName : config.scopePathName,
					companyFooter : config.companyFooter,
					currentTemp : currentTemp,
					desiredTemp : desiredTemp,
					hvacMode : hvacMode,
					isHold : isHold,
					thermostatId : thermostatId,
					name : name
				});
				
			}
		});
	}
}