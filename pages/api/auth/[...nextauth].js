import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers:[

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ]
})