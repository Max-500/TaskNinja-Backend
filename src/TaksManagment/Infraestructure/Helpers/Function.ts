import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Task, TaskPriority, TaskState } from '../../Domain/Entities/Task';
import { User } from '../../Domain/Entities/User';

export function generateUuid():string {
    return uuidv4();
}

export function validateSecurePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialCharacter
    );
}

export function validateTasksArray(array: any[]): boolean {
    if (!Array.isArray(array)) return false;

    if(array.length === 0) return false;

    for (const item of array) {
        if (
            typeof item !== 'object' ||
            !item.title || typeof item.title !== 'string' ||
            !item.description || typeof item.description !== 'string' ||
            !item.priority || typeof item.priority !== 'string' || !Object.values(TaskPriority).includes(item.priority) ||
            !item.notificationTime
        ) {
            return false;
        }
    }

    return true;
}

export function validateTask(data:any): boolean {
    if (!Object.values(TaskPriority).includes(data.priority)) return false;
    return true;
}

function dataToTask(data: any): Task {
    if (!Object.values(TaskPriority).includes(data.priority)) {
        throw new Error("Invalid task priority");
    }

    return new Task(data.title, data.description, TaskState.Pending, data.priority as TaskPriority, data.notificationTime);
}


export function parseTasksArray(array: any[]): Task[] {
    return array.map((data) => dataToTask(data))
}

export function validateUser(data:any):boolean {
    if(!data.name || !data.email || !data.password) return false;
    return true;
}

export function dataToUser(data:any):User{
    return new User(data.name, data.email, data.password);
}

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export async function generateSessionToken(userId: string): Promise<string> {
    const secretKey = 'tu_clave_secreta';
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '30d' });
    return token;
}