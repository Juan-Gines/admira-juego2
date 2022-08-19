<?php

class ValidarInputs
{
  //campos de retorno de validación
  private static $valido;
  private static $msj;
  //Array con las letras del dni ordenadas
  private $letra_dni = [
    'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B',
    'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'
  ];
  //Funciones de limpieza y validación de inputs
  //Funcion que recibe un str y lo devuelve sin espacios de más sin barras de escape ni caracteres html
  public static function input_test($input)
  {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
  }
  //Función que valida un input mail si viene vacio o con caracteres basura
  public static function limpio_email($mail)
  {
    if (empty($mail)) {
      self::$msj = "* Email requerido";
      self::$valido = false;
    } else {
      $mail = self::input_test($mail);
      if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        self::$msj = "* Email inválido";
        self::$valido = false;
      } else {
        self::$msj = $mail;
        self::$valido = true;
      }
    }
  }
  //Función que valida un input text si viene vacio o con caracteres basura
  public static function limpio_alfanum($alfanum, $campo, $max = 50, $min = 1)
  {
    if (empty($alfanum)) {
      self::$msj = "* " . $campo . " requerido";
      self::$valido = false;
    } else {
      $alfanum = self::input_test($alfanum);
      if (!preg_match("/^[Á-ÚÀ-ÙÄËÏÖÜá-úà-ùä-ü\w\d '-]{" . $min . "," . $max . "}$/i", $alfanum)) {
        self::$msj = "* Sólo alfanúmericos " . $min . "-" . $max . "";
        self::$valido = false;
      } else {
        self::$msj = $alfanum;
        self::$valido = true;
      }
    }
  }
  //Funcion que valida un input DNI si viene vacío o es incorrecto
  public static function limpio_dni($dni)
  {
    if (empty($dni)) {
      self::$msj = "* Dni requerido";
      self::$valido = false;
    } else {
      $dni = self::input_test($dni);
      if (!preg_match("/^[\d]{8}[A-Z]{1}$/i", $dni) || self::$letra_dni[intval(substr($dni, 0, 8)) % 23] != strtoupper(substr($dni, 8, 1))) {
        self::$msj = "* DNI/NIF invalido!";
        self::$valido = false;
      } else {
        $dni = strtoupper($dni);
        self::$msj = $dni;
        self::$valido = true;
      }
    }
  }
  //Funcion que valida un input pass si viene vacío o es incorrecto
  public static function limpio_pass($pass, $len)
  {
    if (empty($pass)) {
      self::$msj = "* Password requerido";
      self::$valido = false;
    } else {
      if (strlen($pass) < $len) {
        self::$msj = "* Mínimo " . $len . " caracteres";
        self::$valido = false;
      } else {
        self::$msj = htmlspecialchars($pass);
        self::$valido = true;
      }
    }
    $resultado = ["valido" => self::$valido, "msj" => self::$msj];
    return $resultado;
  }
  //Funcion que valida un input pass si viene vacío, es incorrecto y es igual que el 1er pass
  public static function limpio_pass2($pass1, $pass)
  {
    if (empty($pass)) {
      self::$msj = "* Password requerido";
      self::$valido = false;
    } else {
      $pass = htmlspecialchars($pass);
      if ($pass1["valido"] && $pass1["msj"] == $pass) {
        self::$msj = $pass;
        self::$valido = true;
      } else {
        self::$msj = "* Password diferente";
        self::$valido = false;
      }
    }
  }
  //funcion que limpia la fecha de nacimiento ojo da si no es mayor de 10 años
  public static function limpio_fecha($fecha)
  {
    if (empty($fecha)) {
      self::$msj = "* Fecha requerida";
      self::$valido = false;
    } else {
      $fecha = self::Input_test($fecha);
      if (!preg_match("#^[\d]{4}(-)[\d]{2}(-)[\d]{2}$#", $fecha)) {
        self::$msj = "* Fecha invalida!";
        self::$valido = false;
      } else {
        $f = explode("-", $fecha);
        if (!checkdate($f[1], $f[2], $f[0])) {
          self::$msj = "* Fecha invalida!";
          self::$valido = false;
        } else {
          $fecha = date_create($fecha);
          $fecha_actual = date_create();
          $diff = date_diff($fecha, $fecha_actual);
          if ($diff->format('%y') < 10 || $diff->invert == 1) {
            self::$msj = "* Fecha invalida!";
            self::$valido = false;
          } else {
            self::$msj = date_format($fecha, 'Y-m-d');
            self::$valido = true;
          }
        }
      }
    }
  }
  //funcion que limpia lo que viene de un imput tipo url
  public static function limpio_url($url)
  {
    if (empty($url)) {
      self::$msj = "* Por favor rellena la url";
      self::$valido = false;
    } else {
      $url = self::input_test($url);
      if (!filter_var($url, FILTER_VALIDATE_URL)) {
        self::$msj = "* Introduzca una url válida";
        self::$valido = false;
      } else {
        self::$msj = $url;
        self::$valido = true;
      }
    }
  }
  //funcion que limpia lo que vamos a insertar en una consulta de sql recibe un array de 1 o 2 dimensiones         
  public static function limpio_sql($dblink, $input)
  {
    foreach ($input as $key => $limpio) {
      if (is_array($limpio)) {
        foreach ($limpio as $k => $lim) {
          $lim = htmlspecialchars($lim);
          $lim = mysqli_real_escape_string($dblink, $lim);
          $input[$key][$k] = $lim;
        }
        continue;
      }
      $limpio = htmlspecialchars($limpio);
      $limpio = mysqli_real_escape_string($dblink, $limpio);
      $input[$key] = $limpio;
    }
    return $input;
  }
  //funcion que limpia lo que viene de un select
  public static function limpio_select($select, $options)
  {
    foreach ($options as $opc) {
      self::$valido = ($opc == $select) ? true : false;
      self::$msj = (self::$valido) ? "" : "Dato incorrecto";
      if (self::$valido) {
        break;
      } else {
        continue;
      }
    }
  }
  public static function valido()
  {
    return self::$valido;
  }
  public static function msj()
  {
    return self::$msj;
  }
}
