function replaceBreadcrumbs() {
  var oldBreadcrumb = $('#old_breadcrumb');
  var breadcrumb = $('#breadcrumb');
  var breadcrumbHTML = '';

  var bits = oldBreadcrumb[0].textContent.trim().replace(/\/$/, '').split('/');
  var path = '';
  bits.forEach(function(item, idx) {
    path += item + '/';

    if (idx == 0) { item = 'Repositories'; }

    if (idx == bits.length - 1) {
      breadcrumbHTML += '<li class="breadcrumb-item active" aria-current="page">' + item + '</li>';
    } else {
      breadcrumbHTML += '<li class="breadcrumb-item"><a href="' + path + '">' + item + '</a></li>';
    }
  });

  breadcrumb.append(breadcrumbHTML);
  oldBreadcrumb.remove();
}

function fixTable() {
  var table = $('#list');

  // Make table pretty
  table.removeAttr("cellpadding");
  table.removeAttr("cellspacing");
  table.addClass(['table', 'table-sm', 'table-hover', 'text-nowrap', 'table-striped', 'table-borderless']);

  // Fix header
  header = $('tr', table)[0];
  header.remove();
  thead = $('<thead>');
  thead.addClass(['thead-dark']);
  thead.append(header);
  table.prepend(thead);
  $(header).prepend($('<th class="col-auto"></th>'));
  $('th:gt(1)', header).addClass(['col-auto', 'd-none', 'd-md-table-cell']);

  // Remove "Parent Directory"
  $('a[href^="../"]', table).closest('tr').remove();

  // Per-Row changes.
  $('tbody tr', table).each(function() {
    // Add Icon Column
    var icon = $('<td></td>');
    icon.addClass(['col-auto']);
    var filename = $('td:first a', this).attr('href').replace(/\?.*$/, '');

    var iconName = '';

    if (filename.endsWith('/')) {
      iconName = 'fas fa-folder';
    } else {
      iconName = 'far fa-file-alt';
    }

    icon.append($('<i class="' + iconName + '" aria-hidden="true"></i>'));

    $(this).prepend(icon);

    // Hide other columns on mobile except icon and filename.
    $('td:gt(1)', this).addClass(['col-auto', 'd-none', 'd-md-table-cell']);
    $('td:eq(1)', this).addClass(['col']);
  });
}

function showReadme() {
  var content = $('#mainContent');

  $('a[href="README.md" i],a[href="README" i],a[href="README.txt" i]').each(function(i, el) {
    var filename = $(el).attr('href');

    $.get(filename, function(data) {
      var e = $('<hr/><div id="README" class="my-8"></div>');

      if (filename.toLowerCase() == 'readme.md') {
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        var div = $('<div>');
        div.html(converter.makeHtml(data));
        e.append(div);
      } else {
        var pre = $('<pre>');
        pre.text(data);
        e.append(pre);
      }

      content.append(e);
    });

    return false;
  });
}

$(function() {
  try {
    replaceBreadcrumbs();
    fixTable();
    showReadme();
  } finally {
    $('#mainContent').show();
  }
});
