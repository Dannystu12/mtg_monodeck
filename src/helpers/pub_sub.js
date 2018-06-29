const PubSub = {
  subscribe: function(channel, callback){
    document.addEventListener(channel, callback);
  },

  publish: function(channel, payload){
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
  }
};

module.exports = PubSub;
