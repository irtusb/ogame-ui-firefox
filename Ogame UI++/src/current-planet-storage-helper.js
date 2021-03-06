var fn = function () {
  'use strict';
  window._addCurrentPlanetStorageHelper = function _addCurrentPlanetStorageHelper () {
    var resources = window._getCurrentPlanetResources();
    var resourcesArr = ['metal', 'crystal', 'deuterium'];
    var tooltips;
    try {
      var f = null;
      f = [...document.querySelectorAll('script')].find(e => e.innerText.includes('reloadResources')).innerText;
      f = f.replace(/(.|\n)+reloadResources\(/gi, '');
      f = f.replace(/\)\;\n|\s\}\)\(jQuery\)\;/gi, '');
      tooltips = JSON.parse(f);
    }
    catch (e) {
      console.log('uipp : error while parsing resource tooltips');
    }

    if (resources) {
      resourcesArr.forEach(function (resource) {
        // indicates storage left (in time)
        $('#' + resource + '_box .value').append([
          '<br>',
          '<span class="enhancement storageleft">',
          window._time((resources[resource].max - resources[resource].now) / resources[resource].prod, -1),
          '</span>'
        ].join(''));

        // add indicators to tooltip
        if (!tooltips) {
          return;
        }

        var tempTooltip = tooltips.resources[resource].tooltip.replace(
          '</table>',
          [
            '<tr class="enhancement">',
            '<th>' + window._translate('CURRENT_STORAGE_TIME') + ' :</th>',
            '<td>' + window._time((resources[resource].max - resources[resource].now) / resources[resource].prod, -1) + '</td>',
            '</tr>',
            '<tr class="enhancement">',
            '<th>' + window._translate('TOTAL_STORAGE_TIME') + ' :</th>',
            '<td>' + (window._time(resources[resource].max / resources[resource].prod).length > 0 ? window._time(resources[resource].max / resources[resource].prod) : '') + '</td>',
            '</tr>',
            '</table>'
          ].join('')
        );

        window.changeTooltip($('#' + resource + '_box'), tempTooltip);
      });
    }
  };
};

var script = document.createElement('script');
script.textContent = '(' + fn + ')()';
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
