'use strict';

module.exports = {
  url: '/create?campaign&{test:bool}',
  templateUrl: '/views/pledge/create.html',
  controller: 'PledgeCreateController',
  resolve: {
    campaign: getCampaign,
    pledge: newPledge
  }
};

function getCampaign  (Campaign, $stateParams) {
  return new Campaign({id: $stateParams.campaign}).$active().$fetch();
}
getCampaign.$inject = ['Campaign', '$stateParams'];


function newPledge (campaign, live, $stateParams) {
  return campaign.pledges.$new({
    donor: {},
    started_at: new Date(),
    live: live.enabled(!$stateParams.test)
  });
}
newPledge.$inject = ['campaign', 'live', '$stateParams'];
