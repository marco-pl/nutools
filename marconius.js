// ==UserScript==
// @name         marconius
// @namespace    http://tampermonkey.net/
// @version      0.1.133
// @description  try to take over the world!
// @author       You
// @match        https://planets.nu/
// @grant        none
// ==/UserScript==

/*------------------------------------------------------------------------------
 1. Test
------------------------------------------------------------------------------*/


(function() {
  'use strict';
  
  function addCssRule(selector, rule) {
    $("head").append("<style>" + selector + " { " + rule + " }</style>");
  };

  addCssRule('.ItemSelection'
  , 'min-height: 44px;');
  addCssRule('span.shipName'
  , 'font-size: 65%;');
  addCssRule('#SelectLocation .lval > span.raligned, span.raligned'
  , 'left: auto; right: 7px;');
  addCssRule('div.raligned'
  , 'text-align: right;');
  addCssRule('.lval.halved, #SelectLocation .lval.halved'
  , 'display: inline-block; min-width: 80px; width: 48%; margin-right: 0;');
  addCssRule('.lval.partial, #SelectLocation .lval.partial'
  , 'display: inline-block; min-width: 50px; width: 32%; margin-right: 0;');
  addCssRule('.megacredits::before'         // nu.css misses the leading dot
  , 'color: #99ff99; content: "\\f155";');
  addCssRule('#ShipStatusbar, #Missionbar, #Warpbar, #Enemybar, #ShipFriendlybar'
  , 'left: 180px;');
  addCssRule('.BoxContent'
  , 'width: 365px; height: 455px;');
  addCssRule('.MainScreenPic'
  , 'width: 120px');
  addCssRule('#MainFleetContainer'
  , 'top: 40px; height: auto; width: 365px;');
  addCssRule('.FleetPic > img'
  , 'width: 58px; height: 58px;');
  addCssRule('#BoxContainer'
  , 'top: 165px; padding-left: 5px;');
  addCssRule('#TransferScreen .formrow label'
  , 'width: 88px;');
  addCssRule('#LeftContent .vval'
  , 'font-size: 12px; margin-left: -5px; padding-right: 95px;');
  addCssRule('#totalnolabel'
  , 'margin-left: -5px;');
  addCssRule('#LeftContent.DrawingTools'
  , 'width: 160px');
  addCssRule('#StarbaseTechbar .lval b, #StarbaseDefensebar .lval b, #BuildTorpsbar .lval b'
  , 'width: 60px');
  addCssRule('#SpaceDockbar'
  , 'left: 235px');
  addCssRule('#StarbaseFriendlybar, #Ordersbar'
  , 'left: 212px');
  addCssRule('#StarbaseDefensebar, #BuildTorpsbar'
  , 'left: 120px');
  addCssRule('.tc1000'
  , 'bottom: 240px; right: auto;');
  addCssRule('.tc100'
  , 'bottom: 210px; right: auto;');
  addCssRule('.tc10'
  , 'bottom: 180px; right: auto;');
  addCssRule('.tc1'
  , 'bottom: 150px; right: auto;');
  addCssRule('#tcontrol::before'
  , 'bottom: 120px; right: auto; height: 31px; line-height: 28px;');
  addCssRule('#tcontrol.leftright::before'
  , 'width: 22px;');
  addCssRule('.tc_1'
  , 'bottom: 90px; right: auto;');
  addCssRule('.tc_10'
  , 'bottom: 60px; right: auto;');
  addCssRule('.tc_100'
  , 'bottom: 30px; right: auto;');
  addCssRule('.tc_1000'
  , 'bottom: 0px; right: auto;');
  addCssRule('#tcontrol.leftright'
  , 'width: 89px;');
  addCssRule('#tcontrol.leftright div'
  , 'width: 40px;');
  addCssRule('.leftright .tc1, .leftright .tc10, .leftright .tc100, .leftright .tc1000'
  , 'right: 0px;');
  addCssRule('.leftright .tc_1, .leftright .tc_10, .leftright .tc_100, .leftright .tc_1000'
  , 'right: 43px;');
  addCssRule('#tcontrol div'
  , 'height: 28px; line-height: 28px;');
  addCssRule('#tcontrol'
  , 'width: 55px;');
  addCssRule('#MoreScreen'
  , 'min-height: 320px;');
  addCssRule('#mtarget, #ftarget, #dtarget'
  , 'margin-right: 60px;');
  addCssRule('#ShipMissions .SelectBox'
  , 'width: 125px;');
  addCssRule('.flex-container'
  , 'padding: 0; margin: 0 5px 0 0; list-style: none; display: flex; justify-content: space-between; ');
  addCssRule('.readyCBmini'
  , 'background-image: url(/img/game/threereadycheckspace.png); background-position: 1px -63px; '
  + 'float: right; background-repeat-x: no-repeat; height: 18px; width: 18px;');
  addCssRule('.readyCBmini1'
  , 'background-position: 1px -30px;');
  addCssRule('.readyCBmini2'
  , 'background-position: 1px 3px;');
  
  vgapMap.prototype.click = function (e) {
    var shift = e.shiftKey;
    if (vgap.editmode) {
      if (levelbuilder.isMoveModeActive()) {
        var obj = levelbuilder.currentEditObj;
        obj.x = vgap.map.x;
        obj.y = vgap.map.y;
        levelbuilder.updateForChange(obj);
        return;
      }
      if (vgap.map.editToolsOpen) {
        $(document.activeElement).change(); // calls change to make sure currently editing field is updated before adding
        var obj = levelbuilder.getCurrentObj();
        if (levelbuilder.currentobjtype == "starbase") {
          if (vgap.map.over && vgap.map.over.isPlanet)
            obj.planetid = vgap.map.over.id;
          else
            return;
        }
        else {
          obj.x = vgap.map.x;
          obj.y = vgap.map.y;
        }
        levelbuilder.addCurrentObj();
        vgap.map.updateEditTools();
        return;
      }
    }
    var tool = this.drawingtool;
    if (tool && tool.isDrawMode) {
      var type = tool.current.addType;
      var color = "#ffffff";
      if (tool.current.markup && tool.current.markup.color)
        color = tool.current.markup.color;
      var markup = null;
      switch (type) {
        case "circle":
          var radius = 81;
          if (tool.current.markup)
            radius = tool.current.markup.r;
          markup = { type: type, x: this.x, y: this.y, r: radius, attr: { stroke: color } };
          break;
        case "line":
          markup = tool.current.markup;
          if (markup == null)
            markup = { type: type, points: [{ x: this.x, y: this.y }], attr: { stroke: color } };
          else
            markup.points.push({ x: this.x, y: this.y });
          break;
        case "point":
          var text = "";
          var snapto = true;
          if (tool.current.markup) {
            text = tool.current.markup.text;
            snapto = tool.current.markup.snapto;
          }
          markup = { type: type, x: this.x, y: this.y, text: text, snapto: snapto, attr: { stroke: color } };
          break;
        case "text":
          var text = "";
          if (tool.current.markup)
            text = tool.current.markup.text;
          markup = { type: type, x: this.x, y: this.y, text: text, attr: { fill: color } };
          break;
      }
      if (markup != null) {
        markup.color = color;
        tool.current.markup = markup;
        this.showMarkupParams(markup);
        this.draw();
      }
      return;
    }
    vgap.closeMore();
    if (this.putHypCircle) {
      this.hyperjump(this.x, this.y);
      //this.putHypCircle = false;
      $("body").css("cursor", "");
      return;
    }
    if (this.measure) {
      this.markMeasure();
      return;
    }
    //second click on the same item. Open it up.
    //if (this.over && this.activePlanet) {
    //  if (this.activePlanet.targetx == this.over.x && this.activePlanet.targety == this.over.y) {
    //    this.loadOver();
    //    return;
    //  }
    //}
    //if (this.over && this.activeShip) {
    //  var dest = vgap.getDest(this.activeShip);
    //  if (dest.x == this.over.x && dest.y == this.over.y) {
    //    this.loadOver();
    //    return;
    //  }
    //}
    if (this.activePlanet) {
      //if (this.over.isPlanet)
      this.planetSelectorClick();
      if (vgap.player.raceid == 12)
        return;
    }
    if (this.activeShip
        && (this.activeShip.readystatus == 0 || e.ctrlKey)// PKL: change waypoints of "not-ready" ships only!
        && !vgap.shipScreen.mapclickdisabled) {
      this.shipSelectorClick(shift);
      if (vgap.shipScreen && vgap.shipScreen.noscanonwaypointset)
        return;
    }
    this.loadOver();
  };

  vgaPlanets.prototype.loadWaypoints = function () {
    var sets = vgap.accountsettings;
    var longwaypoints = new Array(); // PKL: change color for multi-turn waypoints temp variable
    this.waypoints = new Array();
    for (var i = 0; i < vgap.ships.length; i++) {
      //waypoint
      var ship = vgap.ships[i];
      if (ship.ownerid != vgap.player.id && !ship.fullinfo && !vgap.editmode) {
        if (ship.heading != -1 && ship.warp != 0) {
          var relation = vgap.getRelation(ship.ownerid);
          var color = sets.enemyshipto;
          if (vgap.allied(ship.ownerid))
              color = sets.allyshipto;
          if (relation && relation.color && relation.color != "")
              color = "#" + relation.color;
          var speed = vgap.getSpeed(ship.warp, ship.hullid);
          var x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * speed);
          var y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * speed);
          ship.targetx = x2;
          ship.targety = y2;
          this.waypoints.push({ id: ship.id, x1: ship.x, y1: ship.y, x2: x2, y2: y2, color: color });
          //this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr({ stroke: color, "stroke-width": "2", "stroke-opacity": 0.5 }));
        }
      }
      else if (!vgap.editmode || (ship.targetx != 0 && ship.targety != 0)) {
        if (vgap.isChunnelling(ship)) {
          var x = ship.x;
          var y = ship.y;
          //we are initiating a chunnel at warp speed inside a matrix
          if (ship.warp > 0 && (ship.targetx != ship.x || ship.targety != ship.y)) {
            var dasharray = null;
            var color = sets.myshipto;
            var next = vgap.getNextLoc(ship);
            var waypoint = { id: ship.id, x1: x, y1: y, x2: next.x, y2: next.y, color: color, dasharray: dasharray };
            this.waypoints.push(waypoint);
            ship.lastwaypoint = waypoint;
            x = next.x;
            y = next.y;
          }
          var targetId = vgap.getChunnelTarget(ship).id;
          var target = vgap.getShipClosestCopy(targetId, ship.x, ship.y);
          var dasharray = [9, 4];
          var color = "rgba(0, 255, 255, 0.5)";
          if (ship.id < 0)
            color = "rgba(0, 119, 119, 0.15)";
          var linewidth = 2;
          if (ship.hullid != 56 && ship.hullid != 114) {
            dasharray = [5, 2];
            color = "#009999";
          }
          if (vgap.multiChunnel(ship.x, ship.y, target.x, target.y)) {
            linewidth = 6;
            dasharray = [6,6];
          }
          this.waypoints.push({ id: ship.id, x1: x, y1: y, x2: target.x, y2: target.y, color: color, dasharray: dasharray, linewidth: linewidth });
        }
        else if (vgap.isTemporalLancing(ship)) {
          var x = ship.x;
          var y = ship.y;
          var target = vgap.getTemporalLanceEndPoint(ship);
          var dasharray = [9, 4];
          var color = "#FF00FF";
          var linewidth = 2;
          this.waypoints.push({ id: ship.id, x1: x, y1: y, x2: target.x, y2: target.y, color: color, dasharray: dasharray, linewidth: linewidth });
        }
        else {
          var dasharray = null;
          var color = sets.myshipto; //{ stroke: sets.myshipto, "stroke-width": "2", "stroke-opacity": 0.5 };
          var path = vgap.getPath(ship);
          if (vgap.isHyping(ship)) {
            color = "rgba(245, 245, 222, 0.7)";
            dasharray = [2, 2];
            if (path.length > 0) {
              var first = path[0];
              var dist = Math.dist(first.x1, first.y1, first.x2, first.y2);
              var mindist = 339.95;
              var maxdist = 360.05;
              var middist = 350;
              if (vgap.settings.isacademy) {
                mindist = 8;
                maxdist = 9;
                middist = 8.5;
              }
              if (dist < mindist || dist > maxdist) {
                //now we just fly exactly 350
                color = "#FF0000";
                ship.heading = vgap.getHeading(first.x1, first.y1, first.x2, first.y2);
                first.x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * middist);
                first.y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * middist);
              }
              //ship.hypend = { x: first.x2, y: first.y2 };
            }
          }
          //use tower path
          var tower = vgap.isTowTarget(ship.id);
          if (tower != null)
            path = vgap.getPath(tower);
          var startfuel = ship.neutronium;
          for (var j = 0; j < path.length; j++) {
            if (vgap.isHyping(ship) && j > 0)
                break;
            // PKL: BEGIN change color for multi-turn waypoints
            var longway = false;
            if (j == 0 && tower == null && !vgap.isHyping(ship)) {
              var to_x = path[0].x2;
              var to_y = path[0].y2;
              var spd = vgap.getSpeed(ship.warp, ship.hullid);
              var destination = trueNextLoc(ship.x, ship.y, to_x, to_y, spd);
              if (destination.x != to_x || destination.y != to_y) {
                  color = "#0066BB";
                  longway = true;
              }
            }
            // PKL: ENDOF change color for multi-turn waypoints
            //change color for fuel shortage
            var fuel = vgap.getFuelUsage(path[j].x1, path[j].y1, path[j].x2, path[j].y2, ship);
            if (fuel > startfuel && tower == null)
                color = "#ff6600";
            //pod color
            if (ship.hullid >= 200 && ship.hullid < 300)
                color = colorToRGBA("#7a7a3e", 0.1);
            startfuel -= fuel;
            var waypoint = { id: ship.id, x1: path[j].x1, y1: path[j].y1, x2: path[j].x2, y2: path[j].y2, color: color, dasharray: dasharray };
            if (longway) // PKL: collect long waypoints separatedly
              longwaypoints.push(waypoint);
            else
              this.waypoints.push(waypoint);
            // this.waypoints.push(this.paper.path("M" + this.screenX(path[j].x1) + " " + this.screenY(path[j].y1) + "L" + this.screenX(path[j].x2) + " " + this.screenY(path[j].y2)).attr(params));
            ship.lastwaypoint = waypoint;
          }
        }
      }
    }
    // PKL: push (draw) long waypoints as last
    for (var i = 0; i < longwaypoints.length; i++) {
      this.waypoints.push(longwaypoints[i]);
    }
    for (var i = 0; i < vgap.ionstorms.length; i++) {
      var storm = vgap.ionstorms[i];
      if (storm.parentid == 0) {
        var x = storm.x;
        var y = storm.y;
        if (storm.centroid) {
            x = storm.centroid.x;
            y = storm.centroid.y;
        }
        var x2 = x + Math.round(Math.sin(Math.toRad(storm.heading)) * storm.warp * storm.warp);
        var y2 = y + Math.round(Math.cos(Math.toRad(storm.heading)) * storm.warp * storm.warp);
        //add 1000 to id to make sure it doesnt' match up with ship ids
        this.waypoints.push({ id: 1000 + storm.id, x1: x, y1: y, x2: x2, y2: y2, color: colorToRGBA("#FFFF00", 0.1) });
      }
    }
    if (vgap.player.raceid == 12) {
      for (var i = 0; i < vgap.myplanets.length; i++) {
        var planet = vgap.myplanets[i];
        if (planet.podhullid > 0) {
          if (planet.builtdefense > 0 && vgap.player.raceid == 12) {
              var podTarget = vgap.getShip(planet.builtdefense);
              if (podTarget != null) {
                  //bounce off accellerator
                  this.waypoints.push({ id: planet.id, x1: planet.x, y1: planet.y, x2: podTarget.x, y2: podTarget.y, color: colorToRGBA("#7a7a3e", 0.5) });
                  this.waypoints.push({ id: planet.id, x1: podTarget.x, y1: podTarget.y, x2: planet.targetx, y2: planet.targety, color: colorToRGBA("#7a7a3e", 0.5) });
              }
          }
          else
            this.waypoints.push({ id: planet.id, x1: planet.x, y1: planet.y, x2: planet.targetx, y2: planet.targety, color: colorToRGBA("#7a7a3e", 0.5) });
        }
      }
    }
    // PKL: Host-like ship's next location calculation
    function trueNextLoc(x, y, to_x, to_y, dist) { // dist == current speed
      var dx = to_x - x;
      var dy = to_y - y;
      var r = Math.dist(to_x, to_y, x, y);
      if (r <= dist) {
        return {x: to_x, y: to_y};
      }
      else {
        var ndx = Math.max(Math.abs(dx), Math.abs(dy));
        var ndy = Math.min(Math.abs(dx), Math.abs(dy));
        var by_x = Math.floor(ndx*dist/r + 0.5);
        var by_y = Math.floor(by_x*(ndy/ndx) + 0.5);
        if (Math.abs(dx) < Math.abs(dy)) {
           var temp = by_y;
           by_y = by_x;
           by_x = temp;
        }
        if (to_x < x) { by_x = -by_x; }
        if (to_y < y) { by_y = -by_y; }
      }
      return {x: x + by_x, y: y + by_y};
    }
  };

  
  vgaPlanets.prototype.showMore = function (width, pane) {
    if (!this.moreOpen)  this.playSound("fastwoosh");
    vgap.closeScan();
    vgap.hideHover();
    this.more.show();
    $("<div id='morebottom'>OK</div>").tclick(function () { vgap.closeMore(); }).appendTo(this.more);
    $("<div id='tcontrol'/>").appendTo(this.more).hide();
    var wi = 270;                // <--------- Marconius
    if (width) 
      wi = width;
    this.more.width(wi); 
    var left = vgap.lc.width() * vgap.scale;
    if (!vgap.landscape || !vgap.lcOpen) left = 0; //portait
    this.more.css("left", left + "px");
    this.moreOpen = true;
    if (pane) {
      //console.log(pane.html());
      var maxheight = $(window).height() - 60 - 280;
      if (vgap.landscape)
        maxheight = $(window).height() / vgap.scale - 80;
      //console.log(this.more.height() + " vs " + maxheight);
      if (this.more.height() > maxheight) {
        pane.height(maxheight);
        pane.jScrollPane({ verticalGutter: -2 });
      }
    }
    if (!vgap.landscape && this.more.height() + 95 > $(window).height())
      this.more.css("bottom", "0px");
    if (vgap.assistant)
      vgap.assistant.lastactiontime = Date.now();
  };
  
  function getHullShortName(longName) {
    return ((longName.includes('Class')) ? getShipClassName(longName)
    : ((longName.includes('Freighter')) ? concatFirstLetters(longName)
    : ((longName.includes('Refinery')) ? 'Refinery' : longName)));
      function getShipClassName(longName) {
        return longName.split('Class')[0];
      }
      function concatFirstLetters(longName) {
        return longName.split(' ').map(x => x[0]).join('');
      }
  };

  function chooseOwnAllyEnemyUnknownClass (ownerid, infoturn) {
    if (ownerid == vgap.player.id)                return "MyItem";
    if (vgap.allied(ownerid))                     return "AllyItem";
    if (ownerid != vgap.player.id && ownerid > 0) return "EnemyItem";
    if (ownerid == 0 && infoturn)                 return "UnknownItem";
    return "";
  }

  sharedContent.prototype.planetScan = function (planet, tempAtTop) {
    var player = vgap.getPlayer(planet.ownerid);
    var race = vgap.getRace(player.raceid);
    var note = vgap.getNote(planet.id, 1);
    var cls = chooseOwnAllyEnemyUnknownClass(planet.ownerid, planet.infoturn);
    $("#ScanTitle").addClass(cls);

    var html = "<div class='ItemSelection " + cls + "'>"
    + addClimateAndTempDivIfKnown()
    + addPlanetImage()
    + addClansQuantityAndDefence();
    //+ "<hr class='surveyOnly'/><div class='lval fcv surveyOnly'>" + planet.friendlycode + "</div><hr class='surveyOnly'/>"

      function addClimateAndTempDivIfKnown() {
        return (planet.temp < 0) ? ''
        : "<div class='sval " + planet.climate + "' style='position:relative;"
        + ((!tempAtTop) ? "top:45px;right:10px;" : "top:-25px;right:5px;") + "'>"
        + planet.temp + "</div>";
      }
      function addPlanetImage() {
        return "<img src='" + planet.img + "' style='top:7px;'/>";
      }
      function addClansQuantityAndDefence() {
        return "<div class='lval clans' " + (planet.clans <= 0 ? "style='opacity:0.2;'" : "") + ">" 
        + addCommas(planet.clans * 100) + ' df: ' + gsv(planet.defense) + "</div>";
      }

    if (planet.infoturn > 0 || vgap.editmode) {
      let cash = "<hr/><div class='lval mc'>" + gsv(planet.megacredits) 
        + " <span>+" + gsv(Math.round(planet.colonisttaxrate * planet.clans / 1000)) 
        + ' (' + planet.colhappychange + ")</span></div>";
          
      if (vgap.gameUsesSupplies())
        html += cash + "<div class='lval supplies'>" + gsv(planet.supplies)
        + " <span>+" + gsv(planet.factories) + "</span></div>";
      else
        html += "<div class='lval'>&nbsp;</div>" + cash;
          
      let drawMineral = function(cls, mineral) {
        let qtty = (planet.groundneutronium < 0 && planet.totalneutronium > 0)
        ? planet['total' + mineral] : planet['ground' + mineral];
        let dens = planet['density' + mineral];
        let desc = (dens > 0) ? " (" + dens + "%)" : "";
        let make = Math.round(dens * planet.mines / 100); if ( make > qtty ) make = qtty;
        return "<div class='lval " + mineral + "'>" + gsv(planet[mineral]) + ' (+' + gsv(make)
        + ")<span style='color:" + vgap.densityToColor(dens) + ";' class='raligned'>"
        + gsv(qtty) + ' ' + desc + "</span></div>";
      }

      if (vgap.gameUsesFuel())
        html += drawMineral('neu ItemSpace', 'neutronium');
      html += drawMineral('dur', 'duranium');
      html += drawMineral('tri', 'tritanium');
      html += drawMineral('mol', 'molybdenum');
    }

    if (planet.nativeclans > 0)
      html += "<hr/><span class='nativetype'>" + planet.nativeracename + " "
      + planet.nativegovernmentname + " " + planet.nativetaxrate + "%</span>"
      + "<div class='lval halved natives'>"
      + addCommas(planet.nativeclans * 100) + "</div><div class='lval halved raligned "
      + vgap.getHappyClass(planet.nativehappypoints) + "'>" + planet.nativehappypoints
      + ' (' + planet.nativehappychange + ') ' + "</div>";

    if (planet.ownerid == 0) {
      //var pName = "Planet";
      //if (planet.debrisdisk > 0)
      //    pName += "oid";
      //if (planet.infoturn == 0)
      //    html += "<hr/><div>Unknown " + pName + "</div>";
      //else
      //    html += "<hr/><div>Unowned " + pName + "</div>";
    }
    else if (planet.ownerid != vgap.player.id)
      html += "<hr/><div>" + race.adjective + " (" + player.username + ")</div>";

    if (note != null)
      html += "<hr/><div class='GoodTextNote'>" + note.body.replace(/\n/g, "<br/>") + "</div>";

    html += "</div>";
    console.log(planet);

    return html;
  };

  sharedContent.prototype.starbaseScan = function (starbase, showTitle) {
    var planet = vgap.getPlanet(starbase.planetid);
    return "<div class='ItemSelection " + chooseOwnAllyEnemyUnknownClass(planet.ownerid) + "'>"
    + addTitleIfRequested()
    + addStarbaseImage()
    + addStarbaseDefence()
    + addStarbaseFighters()
    + addStarbaseTechLevels()
    + addHullInSpacedockIfAny();
    + "</div>";
    function addTitleIfRequested() {
      return (!showTitle) ? '' 
      : "<div class='ItemTitle'><div class='sval " + planet.climate + "'>" + planet.temp + "</div>"
        + Math.abs(planet.id) + ": " + planet.name + "</div>";
    }
    function addStarbaseImage() {
      return "<img src='" + vgap.getStarbaseIcon(starbase.starbasetype) + "' " + (showTitle ? "" : "style='top:7px;'") + "/>";
    }
    function addStarbaseDefence() {
      return "<div class='lval partial defense'>" + starbase.defense + "</div>";
    }
    function addStarbaseFighters() {
      return "<div class='lval partial fighters'>" + starbase.fighters + "</div>";
    }
    function addStarbaseTechLevels() {
      return "<hr/><div class='lval enginetech'>" + starbase.hulltechlevel + "-" + starbase.enginetechlevel + "-" + starbase.beamtechlevel + "-" + starbase.torptechlevel + "</div>";
    }
    function addHullInSpacedockIfAny() {
      return (!starbase.isbuilding) ? '' 
      : "<hr/><hr/><div>" + vgap.getHull(starbase.buildhullid).name + "</div>";
    }
  };

  sharedContent.prototype.shipScan = function (ship, showdamage) {
console.log(ship, showdamage, 'readystatus='+ship.readystatus);
    var hull = vgap.getHull(ship.hullid);
    var player = vgap.getPlayer(ship.ownerid);
    var race = vgap.getRace(player.raceid);
    var note = vgap.getNote(ship.id, 2);
    var cls = chooseOwnAllyEnemyUnknownClass(ship.ownerid);
    var html = ''
    + addShipImageCloackedIfIs()
    + addTitleDivWithHullNameReadyStatusIfOwnWarpCloackedIconIfCloacked()
    + addShipNameSpan()
    + addMassAndArmamentDiv()
    + addDamageAndCrewStatusIfNotStandard()
    + addMissionPrimaryEnemyAndFCodeIfOwned();
    
    if (ship.ownerid != vgap.player.id && !vgap.fullallied(ship.ownerid) && !vgap.editmode) {
      html += addRaceNameAndUserName() + addThreatLevel();
    }
    else {
      if (race.id == 12) {
        cargoType = vgap.podCargoType(ship.hullid);
        cargoName = cargoType;
        if (cargoType == "nativeclans")
            cargoName = "native clans";
        html += "<div class='lval " + cargoType + "'><b>" + cargoName + "</b>" + ship.clans + "</div>";

        if (hull.fighterbays > 0) {
            var fighters = Math.floor((ship.clans / hull.cargo) * 10 * hull.fighterbays) + 10;
            html += "<div class='lval fighters'>" + fighters + "</div>";
        }
      }
      else if (showdamage) {
        html += "<div class='lval crew'>" + ship.crew + "/" + hull.crew + "</div>";
        if (ship.damage > 0)
            html += "<div class='lval damage'>" + ship.damage + "%</div>";
      }
      else {
        html += ''
        + addCargoFuelDivIfUsed()
        + addCargoAmmoDivIfUsed()
        + addCargoItemDiv('megacredits')
        + addCargoSuppliesDivIfUsed()
        + addCargoItemDiv('clans')
        + addCargoItemDiv('duranium')
        + addCargoItemDiv('tritanium')
        + addCargoItemDiv('molybdenum')
        ;
        function addCargoFuelDivIfUsed() {
          return (!vgap.gameUsesFuel()) ? ''
          : addCargoItemDiv('neutronium', 'neutronium', false);
        }
        function addCargoSuppliesDivIfUsed() {
          return (!vgap.gameUsesSupplies()) ? '' : addCargoItemDiv('supplies');
        }
        function addCargoAmmoDivIfUsed() {
          return (!vgap.gameUsesAmmo()) ? ''
          : addCargoTorpsDivIfHasLaunchers() + addCargoFightersDivIfHasBays();
            function addCargoTorpsDivIfHasLaunchers() {
              return (hull.launchers < 1) ? '' : addCargoItemDiv('ammo', 'torpedo', false);
            }
            function addCargoFightersDivIfHasBays() {
              return (hull.fighterbays < 1) ? '' : addCargoItemDiv('ammo', 'fighters', false);
            }
        }
        function addCargoItemDiv(item, itemCls, alsoNotLoaded) {
          return (alsoNotLoaded !== false && ship[item] == 0) ? '' : drawCargoItemDiv(item, itemCls);
            function drawCargoItemDiv(item, itemCls) {
              return  "<div class='lval partial " + (itemCls || item) + "'>" + ship[item] + "</div>";
            }
        }
      }
    }
    html += ''
    + addRaceNameAndUserNameIfEditMode()
    + addTowerDivIfAny()
    + addNoteDivIfAny();
    return wrapHtmlWithItemSelectionDivOfClassWithShipId();
      function addShipImageCloackedIfIs() {
        return "<img " + (ship.iscloaked ? "class='imgcloaked'" : "") + " src='" + ship.img + "'/>";
      }
      function addTitleDivWithHullNameReadyStatusIfOwnWarpCloackedIconIfCloacked() {
        return "<div class='ItemTitle'>" + addReadyStatusIconIfOwn()
        + addWarpDiv() + addCloackedIconIfCloacked()
        + Math.abs(ship.id) + ": " + getHullShortName(hull.name) + "</div>";
          function addWarpDiv() {
            return "<div class='sval warp'>" + ship.warp + "</div>";
          }
          function addCloackedIconIfCloacked() {
            return (!ship.iscloaked) ? ''
            : "<div class='sval cloak' style='margin-right:3px;'></div>";
          }
          function addReadyStatusIconIfOwn() {
            return (ship.ownerid != vgap.player.id) ? ''
            : "<div class='readyCBmini readyCBmini" + ship.readystatus + "' ></div>";
          }
      }
      function addShipNameSpan() {
        return "<span class='" + cls + " shipName'>" + ship.name + "</span>";
      }
      function addMassAndArmamentDiv() {
        return "<div class='" + cls + "'>" + addMass() + addArmamentSpan() + "</div>";
        function addMass() {
          return (nu.t.mass ? nu.t.mass : 'Mass') + ": " + vgap.getMass(ship) + "kT ";
        }
        function addArmamentSpan() {
          return '<span> ' + describeBeamsIfAny() + ' '
          + describeTorpsIfAny() + describeBaysIfAny() + '</span>';
          function describeBeamsIfAny() {
            return (ship.beams == 0) ? '' : ship.beams + '&#215;'
            + ['', 'La', 'XL', 'PlB', 'Bl', 'PoB', 'Di', 'HBl', 'Ph', 'HDi', 'HPh'][ship.beamid];
          }
          function describeTorpsIfAny() {
            return (ship.torps == 0) ? '' : ship.torps + '&#215;'
            + ['', 'Mk1', 'Pr', 'Mk2', 'GmB', 'Mk3', 'Mk4', 'Mk5', 'Mk6', 'Mk7', 'Mk8'][ship.torpedoid];
          }
          function describeBaysIfAny() {
            return (ship.bays == 0) ? '' : ship.bays + '&#215;' + 'FB';
          }
        }
      }
      function addDamageAndCrewStatusIfNotStandard() {
        return (crewHasNoKnownLosses() && shipHasNoKnownDamage()) ? ''
        : "<div class='lval halved crew" + (crewHasNoKnownLosses() ? '' : " BadText")
        + "'>" + ship.crew + "/" + hull.crew + "</div>"
        + "<div class='lval halved damage " + (shipHasNoKnownDamage() ? '' : "BadText")
        + "'>" + ship.damage + "%</div>";
          function crewHasNoKnownLosses() {
            return ship.crew == hull.crew || ship.crew < 0;
          }
          function shipHasNoKnownDamage() {
            return ship.damage <= 0;
          }
      }
      function addMissionPrimaryEnemyAndFCodeIfOwned() {
        return (ship.ownerid != vgap.player.id) ? ''
        : "<div><ul class='flex-container'><li>" + getShortMissionName(ship) + "</li><li><b>"
        + ship.friendlycode + "</b></li><li>"
        + getPrimaryEnemyRaceName() + "</li></ul></div>";
          function getShortMissionName(ship) {
            return [ "Explore"
            , "Mine Sweep"
            , "Lay Mines"
            , "Kill!!!"
            , sensorSweepOrBioscan(ship.hullid)
            , "Colonize"
            , "Tow"
            , "Intercept"
            , nameRaceSpecialMission(vgap.getPlayer(ship.ownerid).raceid)
            , "Cloak"
            , "Beam Up Fuel"
            , "Beam Up Dura"
            , "Beam Up Trit"
            , "Beam Up Moly"
            , "Beam Up Supplies"
            , "Repair Ship"
            , "Destroy Planet"
            , "Send Fighters"
            , "Receive Fighters"
            , "Tantrum"
            , "Cloak and Intercept"
            , "Push Minefield"
            , "Pull Minefield"
            , "Enter Wormhole"
            , "Load Artifact"
            , "Transfer Artifact"
            , "Build Robots"
            , "Hide in Warp Well" ][ship.mission];
              function sensorSweepOrBioscan(hullid) {
                return (hullid == 84 || hullid == 1084 || hullid == 96 || hullid == 9)
                ? "Bioscan" : "Sensor Sweep";
              }
              function nameRaceSpecialMission(raceid) {
                return [ ""
                , "Super Refit"
                , "Hisssss"
                , "Super Spy"
                , "Pillage"
                , "Rob"
                , "Self Repair"
                , "Lay Webs"
                , "Dark Sense"
                , "Build Fighters"
                , "Ground Attack"
                , "Build Fighters"
                , "Swarm" ][raceid];
              }
          };
        vgap.shipScreen.ship = ship;
        vgap.shipScreen.owner = vgap.getPlayer(ship.ownerid);
        vgap.shipScreen.planet = vgap.planetAt(ship.x, ship.y)
        vgap.shipScreen.starbase = (!vgap.shipScreen.planet) ? null
        : vgap.getStarbase(vgap.shipScreen.planet.id);
        return vgap.shipScreen.loadMission();
          function getPrimaryEnemyRaceName() {
            return (!ship.enemy) ? 'none'
            : vgap.getRace(vgap.getPlayer(ship.enemy).raceid).shortname;
          }
      }
      function addRaceNameAndUserName() {
        return "<hr/><div>" + race.shortname + " (" + player.username + ")</div>";
      }
      function addThreatLevel() {
        return "<hr/><div>Threat: " + vgap.getThreatLevel(hull) + "</div>"
      }
      function addRaceNameAndUserNameIfEditMode() {
        return (!vgap.editmode) ? '' : addRaceNameAndUserName();
      }
      function addTowerDivIfAny() {
        var tower = vgap.isTowTarget(ship.id);
        return (tower == null) ? ''
        : "<div style='color:#990099;margin-top:10px;'>" + nu.t.towedbyship + " s" + tower.id + "</div>";
      }
      function addNoteDivIfAny() {
        return (note == null) ? ''
        : "<hr/><div class='GoodTextNote'>" + note.body.replace(/\n/g, "<br/>") + "</div>";
      }
      function wrapHtmlWithItemSelectionDivOfClassWithShipId() {
        return "<div class='ItemSelection " + cls + "' data-id='" + ship.id + "'>"
        + html + '</div>';
      }
  };
  
  /*
vgapShipScreen.prototype.loadMission = function (ship, planet) {  // vgapShipScreen.prototype.loadMission
      
      console.log(this);
        var ship = this.ship;
        var mission = this.getMission(this.ship.mission);
        var miss = "";
        //console.log(this.ship.mission);

        var missionTarget = null;
        if (ship.mission1target != 0)
            missionTarget = vgap.getShip(ship.mission1target);

        if (ship.mission == 6 && missionTarget != null && vgap.isSamePoint(ship.x, ship.y, missionTarget.x, missionTarget.y))
            miss += "Tow s" + missionTarget.id;
        else if (ship.mission == 6)
            miss += "Tow <span class='BadText'>No Target</span>";
        else if (ship.mission == 7 && missionTarget != null)
            miss += "Intercept s" + missionTarget.id;
        else if (ship.mission == 7)
            miss += "Intercept: <span class='BadText'>No Target</span>";
        else if (ship.mission == 20 && missionTarget != null)
            miss += "Cloak and Intercept s" + missionTarget.id;
        else if (ship.mission == 20)
            miss += "Cloak and Intercept: <span class='BadText'>No Target</span>";
        else if (ship.mission == 15 && missionTarget != null)
            miss += "Repair s" + missionTarget.id;
        else if (ship.mission == 15)
            miss += "Repair: <span class='BadText'>No Target</span>";
        else if (ship.mission == 18 && (ship.mission1target == null || ship.mission1target == 0))
            miss += "Send Fighters to <span>All Receivers</span>";
        else if (ship.mission == 18) {
            var receiver = "<span class='BadText'>Invalid Target</span>";
            var targetid = Math.abs(ship.mission1target);
            var starbaseOffset = vgap.getFighterTransferOffset();
            if (targetid < starbaseOffset) {
                var missionTarget = vgap.getShip(targetid);
                if (missionTarget != null)
                    receiver = "<span>s" + missionTarget.id + "</span>";
            }
            else {
                var planet = vgap.getPlanet(ship.mission1target - starbaseOffset);
                if (planet != null)
                    receiver = "<span>p" + planet.id + "</span>";
            }
            miss += "Send Fighters to " + receiver;
        }
        else if (ship.mission == 24) {
            var receiver = "<span class='BadText'>Invalid Target</span>";
            var planet = this.planet;
            if (planet != null)
                receiver = "p" + planet.id;

            var artifact = "<span class='BadText'>Invalid Artifact</span>";
            if (planet && planet.artifacts) {
                var art = vgap.getArray(planet.artifacts, ship.mission2target);
                if (art)
                    artifact = art.name;
            }

            miss += "Load " + artifact + " from " + receiver;
        }
        else if (ship.mission == 25) {
            var receiver = "<span class='BadText'>Invalid Target</span>";
            if (ship.mission1target == 0) {
                var planet = this.planet;
                if (planet != null)
                    receiver = "p" + planet.id;
            }
            else {
                var missionTarget = vgap.getShip(ship.mission1target);
                if (missionTarget != null)
                    receiver = "s" + missionTarget.id;
            }
            var artifact = "<span class='BadText'>Invalid Artifact</span>";
            if (ship.artifacts) {
                var art = vgap.getArray(ship.artifacts, ship.mission2target);
                if (art)
                    artifact = art.name;
            }
            miss += "Transfer " + artifact + " to " + receiver;
        }
        else if (ship.mission == 2 || (ship.mission == 8 && this.owner.raceid == 7)) {
            var units = this.getMineUnits(ship);
            miss += this.getMission(ship.mission).name + " <span>" + units + " mines</span>";
        }
        else if (ship.mission == 1) {
            var beamid = ship.beamid;
            if (vgap.player.raceid == 12) //horwasp beams
                beamid = Math.floor((ship.clans / vgap.getHull(ship.hullid).cargo) * 9) + 1;

            var sweepUnits = ship.beams * beamid * beamid;

            var fighterUnits = 0;
            if (this.owner.raceid == 11 && ship.bays > 0)
                fighterUnits = ship.ammo * 20;

            miss += this.getMission(ship.mission).name + " <span>" + (sweepUnits * 4 + fighterUnits) + " mines / " + sweepUnits * 3 + " web</span>";
        }
        else if (ship.mission == 8 && ship.ownerid == vgap.player.id && vgap.advActive(3)) {

            miss += this.getMission(ship.mission).name;

            //super refit
            var starbase = this.starbase;

            if (starbase && this.planet.ownerid == vgap.player.id) {
                var refits = vgap.getRefitsAtBase(starbase);
                var refit = vgap.getArray(refits, ship.id);
                var sup = "";
                if (refit) {
                    var count = (refit.engines ? 1 : 0) + (refit.beams ? 1 : 0) + (refit.torpedos ? 1 : 0);
                    if (!count)
                        sup = "No parts available";
                    else {
                        if (refit.engines)
                            sup += "<i style='color:#669999;' class='fab fa-superpowers'></i> " + (count == 1 ? vgap.getEngine(refit.engines).name : "");
                        if (refit.beams)
                            sup += "<i style='color:#669999;' class='fab fa-galactic-senate'></i> " + (count == 1 ? vgap.getBeam(refit.beams).name : "");
                        if (refit.torpedos)
                            sup += "<i style='color:#669999;' class='fab fa-first-order'></i> " + (count == 1 ? vgap.getTorpedo(refit.torpedos).name : "");
                    }
                }
                if (sup != "")
                    miss += "<span>" + sup + "</span>";
            }
            else
                miss += "<span>Must be at your starbase</span>";
        }
        else if (!mission || (ship.ownerid != vgap.player.id && ship.mission == 0))
            miss += "?";
        else if (mission.shortname)
            miss += mission.shortname;
        else
            miss += mission.name;

        //cloak fuel burning
        if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
            miss += " <span>" + vgap.cloakFuel(ship) + " fuel / turn</span>";

        this.missionhtml = miss;

        
        return "<div class='lval mission'>" + miss + "</div>";
    };
  //*/
})();