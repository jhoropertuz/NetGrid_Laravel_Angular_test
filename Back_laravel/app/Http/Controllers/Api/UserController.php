<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
         $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);


        if (User::where('email', $request->email)->first()) {
            return response()->json([
                'message' => 'Usuario ya existe.'
            ], 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario creado con exito!',
            'data' => $user,
            'token_access' => $token
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {

                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'message' => 'Bienvenido!',
                    'data' => $user,
                    'token_access' => $token
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Datos incorrectos.'
        ], 404);
    }

    public function userProfile()
    {
        return response()->json([
            'message' => 'perfil.',
            'data' => auth()->user()
        ], 200);
    }

    public function UpdateUserProfile(Request $request) {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email'
        ]);

        $user = User::where('email', auth()->user()->email)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->address = $request->address?? NULL ;
        $user->city = $request->city ?? NULL;
        $user->birthdate = $request->birthdate ?? NULL;

        if($request->password){
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Usario Actualizado.',
            'data' => $user
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Cierre de Sesiòn.'
        ], 200);
    }
}
