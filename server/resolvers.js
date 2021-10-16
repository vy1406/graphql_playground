const db = require('./db');

const Query = {
    company: (root, { id }) => db.companies.get(id),
    job: (root, args) => db.jobs.get(args.id), 
    jobs: () => db.jobs.list()
}

const Company = {
    jobs: (company) => db.jobs.list()
        .filter((job) => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}
// root -> parent Obj
const Mutation = {
    createJob: (root, {input} ) => {
        const id = db.jobs.create(input);
        return db.jobs.get(id);
    }
}
module.exports = { Query, Mutation, Company, Job }