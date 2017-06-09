/**
 * dataHandlers are loaded via the dkan-dash app registry
 * and can be called in your settings.js file
 *
 * dahahandlers should contain domain specific logic related to your project
 *
 */
Drupal.settings.dkanDash.dataHandlers = {
  /**
   * data handlers should have the given arguments
   * by convention, return value is an array
   * where each array value is a series of data, for ex:
   * return [
   *   [
   *      {x: 1, y: 2},
   *      {x: 2, y: 3}
   *   ]
   * ]
   **/
  foo: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    console.log(">>>", arguments);
    let retVal = ['...'];
    
    // Your custom handling code here
    if (dashboardData && dashboardData.contactInfo && dashboardData.contactInfo.all) {
      retVal = [dashboardData.contactInfo.all.result.records[0]['School Name']];
    }
    
    return retVal;
  }
};

