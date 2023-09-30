// Them import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'


// We import object and document schemas
import pageInfo from './pageInfo'
import experience from './experience'
import project from './project';
import skill from './skill';
import social from './social';


export default createSchema({
  name: 'default',

  types: schemaTypes.concat([
    pageInfo,
    experience,
    project,
    skill,
    social,
  ]),
});
