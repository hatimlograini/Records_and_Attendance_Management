<?php

namespace App\Http\Controllers;

use App\Releve;
use Illuminate\Http\Request;

class ReleveController extends Controller
{
    public function index()
    {
        return Releve::select('id', 'COD_RLR', 'DATE_REL', 'NBR_TOTAL_ORDER', 'ANN_TRN', 'PER_TRN', 'ORDRE_LECTURE_PAQUET', 'TOURNEE_DEBUT', 'TOURNEE_FIN')->get();
    }

    public function store(Request $request)
    {
    $validatedData = $request->validate([
        'COD_RLR' => ['required', 'regex:/^R\d{3}$/'],
        'DATE_REL' => 'required',
        'NBR_TOTAL_ORDER' => 'required',
        'ANN_TRN' => 'required',
        'PER_TRN' => 'required',
        'ORDRE_LECTURE_PAQUET' => 'required',
        'TOURNEE_DEBUT' => ['required', 'integer', 'regex:/^\d{9}$/'],
        'TOURNEE_FIN' => ['required', 'integer', 'regex:/^\d{9}$/'],
    ]);


    if ($validatedData['TOURNEE_FIN'] <= $validatedData['TOURNEE_DEBUT']) {
        return response()->json(['message' => 'Invalid creation: TOURNEE_FIN doit être supérieur à TOURNEE_DEBUT.'], 400);
    }

    $existingNumbers = Releve::whereBetween('TOURNEE_DEBUT', [$validatedData['TOURNEE_DEBUT'], $validatedData['TOURNEE_FIN']])
                            ->orWhereBetween('TOURNEE_FIN', [$validatedData['TOURNEE_DEBUT'], $validatedData['TOURNEE_FIN']])
                            ->exists();

    if ($existingNumbers) {
        return response()->json(['message' => 'Invalid update: Les nombres existent déjà ou se chevauchent.'], 400);
    }

    Releve::create($validatedData);

    return response()->json(['message' => 'Added successfully']);
}



    public function show(Releve $releve)
    {
        return response()->json([
            'Releve' => $releve,
        ]);
    }

    public function update(Request $request, Releve $releve)
    {
        $validatedData = $request->validate([
            'COD_RLR' => ['required', 'regex:/^R\d{3}$/'],
            'DATE_REL' => 'required',
            'NBR_TOTAL_ORDER' => 'required',
            'ANN_TRN' => 'required',
            'PER_TRN' => 'required',
            'ORDRE_LECTURE_PAQUET' => 'required',
            'TOURNEE_DEBUT' => ['required', 'integer', 'regex:/^\d{9}$/'],
            'TOURNEE_FIN' => ['required', 'integer', 'regex:/^\d{9}$/'],
        ]);


        if ($validatedData['TOURNEE_FIN'] <= $validatedData['TOURNEE_DEBUT']) {
            return response()->json(['message' => 'Invalid creation: TOURNEE_FIN doit être supérieur à TOURNEE_DEBUT.'], 400);
        }

        $existingNumbers = Releve::whereBetween('TOURNEE_DEBUT', [$validatedData['TOURNEE_DEBUT'], $validatedData['TOURNEE_FIN']])
                             ->orWhereBetween('TOURNEE_FIN', [$validatedData['TOURNEE_DEBUT'], $validatedData['TOURNEE_FIN']])
                             ->exists();

        if ($existingNumbers) {
            return response()->json(['message' => 'Invalid update: Les nombres existent déjà ou se chevauchent.'], 400);
        }

        $releve->update($validatedData);

        return response()->json(['message' => 'Item updated successfully']);
    }

    public function destroy(Releve $releve)
    {
        $releve->delete();

        return response()->json([
            'message' => 'Item deleted successfully',
        ]);
    }
}
