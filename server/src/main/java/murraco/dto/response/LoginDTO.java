package murraco.dto.response;

import lombok.Data;
import java.util.List;
@Data
public class LoginDTO {
    private String username;
    private List<String> permission;
    private String accessToken;
}
