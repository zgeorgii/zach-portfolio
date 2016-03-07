
function Project (opts) {
  this.title = opts.title;
  // this.image = opts.image;
  this.projectButton = opts.projectButton;
  this.projectUrl = opts.projectUrl;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}
Project.all = [];

Project.prototype.toHtml = function() {
  var template = Handlebars.compile($('#project-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'Published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Project.loadAll = function(gitData) {

  gitData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  gitData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if (localStorage.gitData) {
    $.ajax({
      type: 'HEAD',
      url: 'data/gitdata.json',
      success: function(data, message, xhr) {
        console.log('yes');
        var eTag = xhr.getResponseHeader('eTag');
        if(!localStorage.eTag || eTag !== localStorage.eTag){
          localStorage.eTag = eTag;
          $.getJSON('data/gitdata.json', function(data){
            Project.loadAll(data);
            localStorage.gitData = JSON.stringify(gitData);
            projectView.initIndexPage();
          });
        }
        else {
          Project.loadAll(JSON.parse(localStorage.gitData));
          projectView.intitIndexPage();
        }
      }
    });
  }
  else {
    Project.getAll();
    };
  }
  Project.getAll = function() {
    $.getJSON('data/gitdata.json',function(data){
      Project.loadAll(data);
      localStorage.gitData = JSON.stringify(gitData);
      projectView.initIndexPage();
  });
};
