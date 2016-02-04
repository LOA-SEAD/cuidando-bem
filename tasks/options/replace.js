//replace
'use strict';
module.exports = {

    /*
        Remove console stuff from code before minification,
    so code on production won't fill console.
    */
    prod: {
        //overwrite: true,
        src: ['<%= pkg.development %>' + '**/*.js'],
        dest: ['<%= pkg.production %>'],

        replacements: [
            {
                from: /(console.assert)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.count)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.debug)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.dir)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.error)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.group)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.groupCollapsed)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.groupEnd)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.info)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.log)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.profile)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.profileEnd)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.table)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.time)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.timeEnd)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.trace)(.)*\)/g,
                to: ''
            },
            {
                from: /(console.warn)(.)*\)/g,
                to: ''
            }
        ]
    }
};
