module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create a new reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
            },
            {
                type: 'list',
                name: 'type',
                message: 'What type of component is this?',
                choices: ['ui', 'common', 'layout', 'features'],
                default: 'ui',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'components/{{type}}/{{pascalCase name}}/index.ts',
                templateFile: 'plop-templates/index.ts.hbs',
            },
        ],
    })
}
