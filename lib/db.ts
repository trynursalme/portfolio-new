import { put, head } from '@vercel/blob';
import path from 'path';
import fs from 'fs/promises';

export interface Project {
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    repoName?: string;
    repoData?: {
        stars: number;
        language: string;
        updatedAt: string;
        description: string;
        homepage?: string;
    };
    content?: string;
    coverImage?: string;
    tags?: string[];
    order: number;
}

export interface UserData {
    name: string;
    headline: string;
    subHeadline: string;
    about: string;
    email: string;
    phone: string;
    location: string;
    socials: Record<string, string>;
    avatarUrl?: string;
}

export interface SkillCategory {
    id: string;
    title: string;
    skills: string[];
}

export interface Data {
    user: UserData;
    projects: Project[];
    skills: SkillCategory[];
    settings: {
        theme: string;
        password?: string;
    };
}

const defaultData: Data = {
    user: {
        name: 'User',
        headline: 'Headline',
        subHeadline: 'Sub',
        about: 'About',
        email: '',
        phone: '',
        location: '',
        socials: {},
        avatarUrl: ''
    },
    projects: [],
    skills: [],
    settings: { theme: 'system' }
};

const BLOB_FILENAME = 'portfolio-data.json';
const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// In-memory cache
let dataCache: Data | null = null;

/**
 * Check if we're in production (Vercel) or development (local)
 */
function isProduction() {
    return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
}

/**
 * Read data from Vercel Blob
 */
async function readFromBlob(): Promise<Data> {
    try {
        // Check if blob exists
        const blobUrl = process.env.BLOB_READ_WRITE_TOKEN
            ? `https://blob.vercel-storage.com/${BLOB_FILENAME}`
            : null;

        if (!blobUrl) {
            console.log('No BLOB_READ_WRITE_TOKEN found, using default data');
            return defaultData;
        }

        const response = await fetch(blobUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Blob not found, using default data');
            return defaultData;
        }
    } catch (error) {
        console.error('Error reading from blob:', error);
        return defaultData;
    }
}

/**
 * Write data to Vercel Blob
 */
async function writeToBlob(data: Data): Promise<void> {
    try {
        const blob = await put(BLOB_FILENAME, JSON.stringify(data, null, 2), {
            access: 'public',
            addRandomSuffix: false,
        });
        console.log('Data written to blob:', blob.url);
    } catch (error) {
        console.error('Error writing to blob:', error);
        throw error;
    }
}

/**
 * Read data from local JSON file (development)
 */
async function readFromLocal(): Promise<Data> {
    try {
        const fileContent = await fs.readFile(LOCAL_DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.log('Local db.json not found, using default data');
        return defaultData;
    }
}

/**
 * Write data to local JSON file (development)
 */
async function writeToLocal(data: Data): Promise<void> {
    try {
        await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to local file:', error);
        throw error;
    }
}

/**
 * Get database instance
 */
export async function getDb() {
    // Return cached data if available
    if (dataCache) {
        return {
            data: dataCache,
            write: async () => {
                if (isProduction()) {
                    await writeToBlob(dataCache!);
                } else {
                    await writeToLocal(dataCache!);
                }
            }
        };
    }

    // Load data from appropriate source
    if (isProduction()) {
        dataCache = await readFromBlob();
    } else {
        dataCache = await readFromLocal();
    }

    return {
        data: dataCache,
        write: async () => {
            if (isProduction()) {
                await writeToBlob(dataCache!);
            } else {
                await writeToLocal(dataCache!);
            }
        }
    };
}

/**
 * Clear cache (useful for testing or forcing refresh)
 */
export function clearCache() {
    dataCache = null;
}
