@RestController
@RequestMapping("/api/ssh")
public class SSHController {

    private final SSHService sshService;

    public SSHController(SSHService sshService) {
        this.sshService = sshService;
    }

    @PostMapping("/ejecutar")
    public ResponseEntity<String> ejecutarComando(
            @RequestParam String host,
            @RequestParam int puerto,
            @RequestParam String usuario,
            @RequestParam String password,
            @RequestParam String comando
    ) {
        String resultado = sshService.ejecutarComando(host, puerto, usuario, password, comando);
        return ResponseEntity.ok(resultado);
    }
}
