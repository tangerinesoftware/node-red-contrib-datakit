/**
 * Copyright 2017 Nick Pye
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {

    var datakit = require('datakitjs');

    function DatakitNode(config) {
        RED.nodes.createNode(this,config);
	      this.stripFunction = config.stripFunction;
        var node = this;
        this.on('input', function(msg) {
            var context = this.context();
            var data = context.get('data') || [];
	          var funcIndex = msg.topic.lastIndexOf('/');
            var func = msg.topic.slice(funcIndex+1);

	    if (node.stripFunction && (funcIndex != -1)) {
		msg.topic = msg.topic.substring(0,funcIndex);
	    }

            switch (func) {
		case 'clear':
		    context.set('data', []);
		    return null;

		case 'size':
		    msg.payload = data.length;
		    break;

    case 'mean':
      msg.payload = datakit[func](data);
      break;
    case 'sd':
      msg.payload = datakit[func](data);
      break;
    case 'vari':
      msg.payload = datakit[func](data);
      break;
    case 'cov':
      var a = msg.payload[0];
      var b = msg.payload[1];
      msg.payload = datakit[func](a,b);
      break;
    case 'reg':
      var a = msg.payload[0];
      var b = msg.payload[1];
      msg.payload = datakit[func](a,b);
      break;
    case 'seq':
      var value = msg.payload.split(",");
      msg.payload = datakit[func](value[0],value[1],value[2]);
      break;
    case 'rep':
      var value = msg.payload.split(",");
      msg.payload = datakit[func](value[0],value[1]);
      break;
    case 'isclose':
      var value = msg.payload.split(",");
      msg.payload = datakit[func](value[0],value[1]);
      break;
    case 'sum':
      msg.payload = datakit[func](data);
      break;
    case 'prod':
      msg.payload = datakit[func](data);
      break;
    case 'min':
      msg.payload = datakit[func](data);
      break;
    case 'max':
      msg.payload = datakit[func](data);
      break;
    case 'exp':
      var value = msg.payload.split(",");
      msg.payload = datakit[func](value[0],value[1]);
      break;
    case 'norm':
      var value = msg.payload.split(",");
      msg.payload = datakit[func](value[0],value[1],value[2]);
      break;
    case 'uni':
      var value = parseInt(msg.payload);
      if (isNaN(value)) {
          node.warn("Non-numeric data received: " + msg.payload);
      } else {
          msg.payload = datakit[func](value[0],value[1]);
      }
     break;
     default:
		    var value = parseFloat(msg.payload);
            	    if (isNaN(value)) {
                        node.warn("Non-numeric data received: " + msg.payload);
                    } else {
                        data.push(value);
                        context.set('data', data);
		    }
                    // Swallows the message
                    return null;
	    }
            node.send(msg);
        });
    }
    RED.nodes.registerType("datakit",DatakitNode);
}
