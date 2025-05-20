import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// For static export, we'll return a mock response
export async function GET() {
  try {
    // 1. Autenticación directa
    const { userId } = await auth();
    
    // 2. Verificación simple
    if (!userId) {
      return NextResponse.json(
        { error: 'Acceso no autorizado' },
        { status: 401 }
      );
    }

    // 3. Respuesta exitosa
    return NextResponse.json({
      success: true,
      userId,
      message: 'Sesión válida'
    });

  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}