<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Favorite;

class FavoriteController extends Controller
{
    public function myFavorites(){
        $favorites = Favorite::where('user_id', '=', auth()->user()->id)
                           ->pluck('ref_api');

        return response()->json([
            'message' => 'mis favoritos.',
            'data' => $favorites
        ], 200);
    }

    public function addFavorite(Request $request){

        $getFavorite = Favorite::where('user_id', '=', auth()->user()->id)
                        ->where('user_id', '=', auth()->user()->id)
                        ->where('ref_api', '=', $request->ref_api)->first();

        if ($getFavorite) {
            $getFavorite->delete();
            return response()->json([
                'message' => 'Pokemon eliminado de favoritos'
            ], 422);
        }

        $favorite = new Favorite();
        $favorite->ref_api = $request->ref_api;
        $favorite->user_id = auth()->user()->id;
        $favorite->save();

        return response()->json([
            'message' => 'Pokemon añadido a favoritos'
        ], 200);
    }

}
