'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

/**
 * Show
 */

exports.show = function(req, res) {
  res.render('articles/show', {
    title: req.article.title,
    article: req.article
  });
};