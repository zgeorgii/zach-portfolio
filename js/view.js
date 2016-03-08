var projectView = {};

projectView.handleMainMenu = function() {
  $('.main-menu').on('click', '.tab',function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-menu .tab:first').click();

};

projectView.intitNewArticlePage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#project-json').on('focus', function() {
    this.select();
  });
  $('#new-form').on('change', 'input, textarea', projectView.create);
};

projectView.create = function() {
  var project;
  $('#projects').empty();

  project = new Project({
    title: $('#project-title').val(),
    // image: $('#project-img').val(),
    projectButton: $('#project-button').val(),
    projectUrl: $('#project-project-url').val(),
    body: $('#project-body').val(),
    publishedOn: $('#project-published:checked').length ? util.today() : null
  });

  $('#projects').append(project.toHtml());

  $('#export-field').show();
  $('#project-json').val(JSON.stringify(project) + ',')
};

projectView.intitIndexPage = function() {
  Project.all.forEach(function(a){
    $('#projects').append(a.toHtml());
  });
  projectView.handleMainMenu();
};
